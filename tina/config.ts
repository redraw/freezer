import { defineConfig } from "tinacms";
import { bazar___obraFields } from "./templates";
import { cursoFields } from "./templates";
import { notaFields } from "./templates";
import { autorFields } from "./templates";
import { proyectoFields } from "./templates";
import { single_pageFields } from "./templates";
import { configFields, imageUploadDir } from "./templates";
import { TinaCloudCloudinaryMediaStore } from "next-tinacms-cloudinary";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "master";


class CloudinaryStore extends TinaCloudCloudinaryMediaStore {
  persist(files) {
    for (const file of files) {
      const { directory } = file
      // set directory if missing
      if (directory === "") {
        file.directory = imageUploadDir()
      }
    }
    return super.persist(files)
  }
  parse = (img) => {
    return img.src.replace("http://", "https://").replace("image/upload", "image/upload/t_media_lib_thumb")
  }
}

export default defineConfig({
  branch,
  clientId: process.env.TINACMS_CLIENT_ID || '', // Get this from tina.io
  token: process.env.TINACMS_TOKEN || '', // Get this from tina.io
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    loadCustomStore: async () => {
      return CloudinaryStore
    },
  },
  cmsCallback: (cms) => {
    return cms
  },
  schema: {
    collections: [
      {
        format: "md",
        label: "Proyectos",
        name: "proyectos",
        path: "content/proyectos",
        match: {
          include: "**/*",
        },
        fields: [
          ...proyectoFields(),
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        format: "md",
        label: "Cursos",
        name: "cursos",
        path: "content/cursos",
        match: {
          include: "**/*",
        },
        defaultItem: () => {
          return {finalizado: false}
        },
        fields: [
          ...cursoFields(),
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        format: "md",
        label: "Notas",
        name: "notas",
        path: "content/notas",
        match: {
          include: "**/*",
        },
        defaultItem: () => {
          return {listado: true}
        },
        fields: [
          ...notaFields(),
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        format: "md",
        label: "Autores",
        name: "autor",
        path: "content/autores",
        match: {
          include: "**/*",
        },
        defaultItem: () => {
          return {}
        },
        fields: [
          ...autorFields(),
          {
            type: "rich-text",
            name: "bio",
            label: "Bio",
            description: "Bio",
            isBody: true,
          },
        ],
      },
      {
        format: "md",
        label: "Bazar",
        name: "bazar",
        path: "content/bazar/obras",
        match: {
          include: "**/*",
        },
        fields: [
          ...bazar___obraFields(),
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        format: "md",
        label: "Single Pages",
        name: "single_pages",
        path: "content/pages",
        match: {
          include: "**/*",
        },
        fields: [
          ...single_pageFields(),
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        format: "json",
        label: "Config",
        name: "config",
        path: "data",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "config",
        },
        fields: [
          {
            type: "string",
            name: "site_name",
            label: "Site name",
          },
          {
            type: "string",
            name: "site_description",
            label: "Site description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            list: true,
            name: "menu",
            label: "Menu",
            ui: {
              itemProps: (item) => ({
                key: item.name,
                label: item.name,
              }),
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Name",
              },
              {
                type: "string",
                name: "url",
                label: "URL",
              },
            ],
          },
          {
            type: "string",
            name: "tv_playlist",
            label: "TV playlist",
          },
          {
            type: "boolean",
            name: "show_banner",
            label: "Mostrar banner",
          },
          {
            type: "string",
            name: "banner",
            label: "Banner",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "banner_separator",
            label: "Banner separator",
          },
          {
            type: "string",
            name: "banner_separator_color",
            label: "Banner separator color",
            ui: {
              component: "color",
            },
          }
        ],
      },
    ],
  },
});
