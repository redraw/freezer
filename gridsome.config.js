// This is where project configuration and installed plugin options are located.
// Learn more: https://gridsome.org/docs/config

module.exports = {
  siteName: "Freezer",
  siteUrl: "https://freezer.com.ar",
  host: "0.0.0.0",
  titleTemplate: "%s - Freezer",
  siteDescription: "Editora audiovisual",
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "content",
        path: "proyectos/**/*.md",
        typeName: "Proyecto",
        resolveAbsolutePaths: true
      }
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "content",
        path: "cursos/**/*.md",
        typeName: "Curso",
        resolveAbsolutePaths: true
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        baseDir: "content",
        path: "pages/**/*.md",
        typeName: "SinglePage",
        resolveAbsolutePaths: true
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
    SinglePage: "/:title"
  }
};
