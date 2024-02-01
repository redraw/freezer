import { defineConfig } from "tinacms";
import { bazar___obraFields } from "./templates";
import { cursoFields } from "./templates";
import { notaFields } from "./templates";
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
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...proyectoFields(),
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
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...cursoFields(),
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
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...notaFields(),
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
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...bazar___obraFields(),
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
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...single_pageFields(),
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
            type: "string",
            name: "footer",
            label: "Footer text",
          },
          {
            type: "boolean",
            name: "dark_mode",
            label: "Dark mode",
          },
          {
            type: "string",
            name: "tv_playlist",
            label: "TV playlist",
          },
          {
            type: "string",
            name: "banner",
            label: "Banner",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
    ],
  },
});
