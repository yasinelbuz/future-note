import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const message = searchParams.get('message');
  const color = searchParams.get('color');

  if (!message || !color) {
    return NextResponse.json({ error: 'Missing message or color' }, { status: 400 });
  }

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true
  });
  const page = await browser.newPage();
  await page.setContent(`
    <html>
      <body style="background-color: ${color}; display: flex; justify-content: center; align-items: center; height: 100vh;">
        <h1 style="color: white;">${message}</h1>
      </body>
    </html>
  `);
  const screenshot = await page.screenshot();
  await browser.close();

  return new NextResponse(screenshot, {
    headers: { 'Content-Type': 'image/png' }
  });
}