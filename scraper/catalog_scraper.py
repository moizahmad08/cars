import asyncio
from playwright.async_api import async_playwright
import pandas as pd
import os
import sys

def log(msg):
    print(msg)
    sys.stdout.flush()

async def scrape_catalog():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        )
        page = await context.new_page()

        log("Starting PakAuto Master Scraper (1980-2026)...")
        
        try:
            log("Navigating to brand list...")
            await page.goto("https://www.pakwheels.com/new-cars/", wait_until="domcontentloaded", timeout=60000)
            
            await page.wait_for_timeout(3000)
            brands_elements = await page.query_selector_all("a")
            brand_links = []
            
            exclude = ['compare', 'reviews', 'pricelist', 'dealers', 'on-road-price', 'upcoming', 'popular', 'latest', 'news']

            for brand in brands_elements:
                href = await brand.get_attribute("href")
                if href and "/new-cars/" in href:
                    clean_href = href.strip('/')
                    parts = clean_href.split('/')
                    if len(parts) == 2 and parts[0] == 'new-cars':
                        slug = parts[1].lower()
                        if slug not in exclude:
                            name = (await brand.get_attribute("title") or slug).capitalize()
                            brand_links.append({"name": name, "url": f"https://www.pakwheels.com/{clean_href}/", "slug": slug})
            
            brand_links = list({ b['url']: b for b in brand_links }.values())
            log(f"Found {len(brand_links)} actual brands.")
            for b in brand_links:
                log(f"  - {b['name']} ({b['url']})")

            all_cars = []

            # Scraping ALL brands
            for brand_info in brand_links:
                log(f"\n--- Scraping Brand: {brand_info['name']} (slug: {brand_info['slug']}) ---")
                await page.goto(brand_info['url'], wait_until="domcontentloaded", timeout=60000)
                
                await page.wait_for_timeout(3000)
                model_elements = await page.query_selector_all("a")
                model_links = []
                
                for m in model_elements:
                    href = await m.get_attribute("href")
                    if href:
                        clean_m_href = href.strip('/')
                        m_parts = clean_m_href.split('/')
                        if len(m_parts) == 3 and m_parts[0] == 'new-cars' and m_parts[1] == brand_info['slug']:
                            model_links.append(f"https://www.pakwheels.com/{clean_m_href}/")
                
                model_links = list(set(model_links))
                log(f"Found {len(model_links)} models for {brand_info['name']}.")
                
                for model_url in model_links:
                    try:
                        model_slug = model_url.strip('/').split('/')[-1]
                        log(f"  > Model: {model_slug}")
                        await page.goto(model_url, wait_until="domcontentloaded", timeout=60000)
                        await page.wait_for_timeout(2000)
                        
                        variant_elements = await page.query_selector_all("a")
                        variant_links = []
                        for v in variant_elements:
                            v_href = await v.get_attribute("href")
                            if v_href:
                                clean_v_href = v_href.strip('/')
                                v_parts = clean_v_href.split('/')
                                if len(v_parts) == 4 and v_parts[0] == 'new-cars' and v_parts[1] == brand_info['slug'] and v_parts[2] == model_slug:
                                    if v_parts[3] not in ['specs', 'reviews', 'pictures', 'on-road-price', 'videos']:
                                        variant_links.append(f"https://www.pakwheels.com/{clean_v_href}/")
                        
                        variant_links = list(set(variant_links))
                        log(f"    Found {len(variant_links)} variants.")

                        for v_url in variant_links:
                            try:
                                log(f"      - Scraping Variant: {v_url.split('/')[-2]}")
                                v_page = await context.new_page()
                                await v_page.goto(v_url, wait_until="domcontentloaded", timeout=60000)
                                
                                specs = {
                                    "Make": brand_info['name'], 
                                    "Model": model_slug.capitalize(), 
                                    "Variant": v_url.split('/')[-2].capitalize(),
                                    "URL": v_url
                                }
                                
                                # Extract Specs Table
                                spec_rows = await v_page.query_selector_all(".spec-table tr")
                                for row in spec_rows:
                                    cols = await row.query_selector_all("td")
                                    if len(cols) == 2:
                                        key = (await cols[0].inner_text()).strip()
                                        value = (await cols[1].inner_text()).strip()
                                        specs[key] = value
                                
                                all_cars.append(specs)
                                await v_page.close()
                                
                            except Exception as ve:
                                log(f"      Variant error: {ve}")
                                if 'v_page' in locals(): await v_page.close()
                                continue
                            
                    except Exception as e:
                        log(f"    Error on model {model_url}: {e}")
                        continue

            if all_cars:
                os.makedirs("output", exist_ok=True)
                df = pd.DataFrame(all_cars)
                df.to_csv("output/pakauto_master_db.csv", index=False)
                log(f"\nSUCCESS: Saved {len(all_cars)} variants.")
            else:
                log("\nNo data found.")

        except Exception as global_e:
            log(f"Global Scraper Error: {global_e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(scrape_catalog())
