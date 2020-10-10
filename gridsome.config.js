// This is where project configuration and installed plugin options are located.
// Learn more: https://gridsome.org/docs/config

const settings = require('./data/theme.json')


module.exports = {
  siteName: settings.site_name,
  siteUrl: "https://freezer.com.ar",
  host: "0.0.0.0",
  titleTemplate: `%s | ${settings.site_name}`,
  siteDescription: settings.site_description,
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "content",
        path: "proyectos/**/*.md",
        typeName: "Proyecto"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "content",
        path: "cursos/**/*.md",
        typeName: "Curso"
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "content",
        path: "notas/**/*.md",
        typeName: "Nota"
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "content",
        path: "bazar/obras/*.md",
        typeName: "BazarObra",
        refs: {
          autor: {
            typeName: "BazarAutor",
            create: true
          }
        }
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "content",
        path: "pages/**/*.md",
        typeName: "SinglePage"
      }
    },
    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: 'UA-156250757-1'
      }
    }
  ],
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      plugins: ["@gridsome/remark-prismjs"]
    }
  },
  templates: {
    SinglePage: node => `/${node.title}`
  }
};
