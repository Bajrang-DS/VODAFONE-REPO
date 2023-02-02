import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Order Online": "Order Online",
      "Hours":"Hours",
      "PhotoGallery" :"PhotoGallery",
      "Contact": "contact",
      "Get Directions":"Get Directions",
      "The ba&sh wardrobe is full of fashionable clothes which are ideal for all occasions":"The ba&sh wardrobe is full of fashionable clothes which are ideal for all occasions"
    }
  },
  fr: {
    translation: {
      "Contact": "Contactez",
      "Order Online": "Commander en ligne",
      "Restaurant Hours": "Heures d'ouverture",
      "PhotoGallery" : "Galerie de photos",
      "Get Directions" :"Obtenir des directions",
      "The ba&sh wardrobe is full of fashionable clothes which are ideal for all occasions":"LE GARDE-ROBE BA&SH EST REMPLI DE VÊTEMENTS À LA MODE QUI SONT IDÉAUX POUR TOUTES LES OCCASIONS"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;