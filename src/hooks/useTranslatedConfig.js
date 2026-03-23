import { useTranslation } from "react-i18next";
import { LANDING_PAGE_CONFIG } from "../config/landingPageConfig";

export function useTranslatedConfig() {
  const { t } = useTranslation();

  return {
    navLinks: [
      { id: "cat", label: t("nav.furniture"), href: "#categories" },
      { id: "col", label: t("nav.collection"), href: "#bestsellers" },
      { id: "craft", label: t("nav.craftsmanship"), href: "#showcase" },
      { id: "about", label: t("nav.about"), href: "#about" },
      { id: "contact", label: t("nav.contact"), href: "#contact" }
    ],

    heroSlides: [
      {
        ...LANDING_PAGE_CONFIG.heroSlides[0],
        eyebrow: t("hero.eyebrow1"),
        headline: `${t("hero.headline1").split(" ")[0]}\n${t("hero.headline1").split(" ").slice(1).join(" ")}`,
        subheading: t("hero.subheading1"),
        cta: t("hero.cta")
      },
      {
        ...LANDING_PAGE_CONFIG.heroSlides[1],
        eyebrow: t("hero.eyebrow2"),
        headline: `${t("hero.headline2").split(" ")[0]}\n${t("hero.headline2").split(" ").slice(1).join(" ")}`,
        subheading: t("hero.subheading2"),
        cta: t("hero.cta")
      },
      {
        ...LANDING_PAGE_CONFIG.heroSlides[2],
        eyebrow: t("hero.eyebrow3"),
        headline: `${t("hero.headline3").split(" ")[0]}\n${t("hero.headline3").split(" ").slice(1).join(" ")}`,
        subheading: t("hero.subheading3"),
        cta: t("hero.cta")
      }
    ],

    marqueeItems: [
      t("marquee.item1"),
      t("marquee.item2"),
      t("marquee.item3"),
      t("marquee.item4"),
      t("marquee.item5"),
      t("marquee.item6"),
      t("marquee.item7")
    ],

    categoryCards: LANDING_PAGE_CONFIG.categoryCards.map((cat, idx) => ({
      ...cat,
      title: cat.title
    })),

    features: [
      {
        ...LANDING_PAGE_CONFIG.features[0],
        title: t("features.feature1Title"),
        description: t("features.feature1Desc")
      },
      {
        ...LANDING_PAGE_CONFIG.features[1],
        title: t("features.feature2Title"),
        description: t("features.feature2Desc")
      },
      {
        ...LANDING_PAGE_CONFIG.features[2],
        title: t("features.feature3Title"),
        description: t("features.feature3Desc")
      },
      {
        ...LANDING_PAGE_CONFIG.features[3],
        title: t("features.feature4Title"),
        description: t("features.feature4Desc")
      }
    ],

    about: {
      ...LANDING_PAGE_CONFIG.about,
      eyebrow: t("about.eyebrow"),
      title: t("about.title"),
      body: t("about.body"),
      cta: t("about.cta"),
      stats: [
        { value: t("about.stat1Value"), label: t("about.stat1Label") },
        { value: t("about.stat2Value"), label: t("about.stat2Label") },
        { value: t("about.stat3Value"), label: t("about.stat3Label") },
        { value: t("about.stat4Value"), label: t("about.stat4Label") }
      ]
    },

    showcase: {
      ...LANDING_PAGE_CONFIG.showcase,
      eyebrow: t("showcase.eyebrow"),
      title: t("showcase.title"),
      body: t("showcase.body"),
      hotspots: LANDING_PAGE_CONFIG.showcase.hotspots.map((spot, idx) => ({
        ...spot,
        title: t(`showcase.spot${idx + 1}Title`),
        description: t(`showcase.spot${idx + 1}Desc`)
      }))
    },

    lookbook: {
      ...LANDING_PAGE_CONFIG.lookbook,
      eyebrow: t("lookbook.eyebrow"),
      title: t("lookbook.title"),
      cta: t("lookbook.cta"),
      items: LANDING_PAGE_CONFIG.lookbook.items.map((item, idx) => ({
        ...item,
        label: item.label
      }))
    },

    footer: {
      ...LANDING_PAGE_CONFIG.footer,
      tagline: t("footer.tagline"),
      shopLinks: [
        { href: "#", label: t("footer.shopLink1") },
        { href: "#", label: t("footer.shopLink2") },
        { href: "#", label: t("footer.shopLink3") },
        { href: "#", label: t("footer.shopLink4") }
      ],
      companyLinks: [
        { href: "#", label: t("footer.companyLink1") },
        { href: "#", label: t("footer.companyLink2") },
        { href: "#", label: t("footer.companyLink3") },
        { href: "#", label: t("footer.companyLink4") }
      ],
      newsletter: t("footer.newsDesc"),
      copyright: t("footer.copyright"),
      legalLinks: [
        { href: "#", label: t("footer.legal1") },
        { href: "#", label: t("footer.legal2") },
        { href: "#", label: t("footer.legal3") }
      ]
    }
  };
}
