// This is where project configuration and installed plugin options are located.
// Learn more: https://gridsome.org/docs/config

const settings = require('./data/config.json')


module.exports = {
  siteName: settings.site_name,
  siteUrl: "https://freezer.com.ar",
  host: "0.0.0.0",
  titleTemplate: `%s | ${settings.site_name}`,
  siteDescription: settings.site_description,
  plugins: [
    {
      use: "@kriya/gridsome-source-filesystem",
      options: {
        baseDir: "content",
        path: "proyectos/**/*.md",
        typeName: "Proyecto"
      }
    },
    {
      use: "@kriya/gridsome-source-filesystem",
      options: {
        baseDir: "content",
        path: "cursos/**/*.md",
        typeName: "Curso"
      },
    },
    {
      use: "@kriya/gridsome-source-filesystem",
      options: {
        baseDir: "content",
        path: "autores/**/*.md",
        typeName: "Autor"
      },
    },
    {
      use: "@kriya/gridsome-source-filesystem",
      options: {
        baseDir: "content",
        path: "notas/**/*.md",
        typeName: "Nota"
      }
    },
    {
      use: "@kriya/gridsome-source-filesystem",
      options: {
        baseDir: "content",
        path: "bazar/obras/*.md",
        typeName: "BazarObra",
        refs: {
          autor: {
            typeName: "BazarAutor",
            create: true
          },
          categorias: {
            typeName: "BazarCategoria",
            create: true
          }
        }
      }
    },
    {
      use: "@kriya/gridsome-source-filesystem",
      options: {
        baseDir: "content",
        path: "pages/**/*.md",
        typeName: "SinglePage"
      }
    },
    {
      use: '@kriya/gridsome-plugin-google-analytics',
      options: {
        id: 'UA-156250757-1'
      }
    }
  ],
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      plugins: ["@kriya/gridsome-remark-prismjs"]
    }
  },
  templates: {
    SinglePage: "/:title",
    BazarObra: "/bazar/:autor/:title"
  }
};
