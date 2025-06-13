import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { StoreProvider } from "@/redux/storeProvider";
import "@/assets/scss/main.scss";
import ClientLayout from "@/app/[locale]/metaLayout";
import ClientWrapper from "@/components/nprogress/wrapper";
import { Suspense } from "react";

const locales = ["en", "vi", "zh", "ko"];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  const defaultTitle = "Ông đề";
  const description = messages?.description || "Mô tả mặc định cho Ông đề";

  return (
    <StoreProvider>
      <html lang={locale}>
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="keywords" content="Ông đề" />
          <meta name="robots" content="index, follow" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:image" content="/default-og-image.jpg" />
          <link rel="icon" href="/maxima-logo.ico" type="image/x-icon" />
        </head>
        <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Suspense>
              <ClientLayout defaultTitle={defaultTitle} description={description}>
                <ClientWrapper>
                  {children}
                </ClientWrapper>
              </ClientLayout>
            </Suspense>
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  );
}