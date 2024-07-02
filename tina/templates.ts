import type { TinaField } from "tinacms";

export function imageUploadDir() {
  const now = new Date()
  return `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}`
}

export function bazar___obraFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "autor",
      label: "autor",
    },
    {
      type: "datetime",
      name: "date",
      label: "date",
    },
    {
      type: "string",
      name: "precio",
      label: "precio",
    },
    {
      type: "image",
      name: "thumbnail",
      label: "thumbnail",
    },
    {
      type: "string",
      name: "categorias",
      label: "categorias",
      list: true,
    },
    {
      type: "boolean",
      name: "listado",
      label: "listado",
    },
  ] as TinaField[];
}
export function cursoFields() {
  return [
    {
      type: "image",
      name: "thumbnail",
      label: "thumbnail",
      ui: {
        uploadDir: imageUploadDir,
      }
    },
    {
      type: "string",
      name: "title",
      label: "title",
      required: true,
      isTitle: true,
    },
    {
      type: "datetime",
      name: "inicio",
      label: "inicio",
    },
    {
      type: "string",
      name: "docente",
      label: "docente",
    },
    {
      type: "string",
      name: "lugar",
      label: "lugar",
    },
    {
      type: "string",
      name: "mercadopago_link",
      label: "Mercadopago link",
    },
    {
      type: "boolean",
      name: "finalizado",
      label: "finalizado",
    },
    {
      type: "datetime",
      name: "date",
      label: "date",
    },
  ] as TinaField[];
}
export function notaFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "date",
    },
    {
      type: "image",
      name: "thumbnail",
      label: "thumbnail",
      ui: {
        uploadDir: imageUploadDir,
      }
    },
    {
      type: "boolean",
      name: "listado",
      label: "listado",
    },
    {
      type: "object",
      name: "autores",
      label: "autores",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.autor };
        }
      },
      fields: [{
        type: "reference",
        name: "autor",
        label: "autor",
        collections: ["autor"],
      }]
    }
  ] as TinaField[];
}
export function autorFields() {
  return [
    {
      type: "string",
      name: "nombre",
      label: "nombre",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "url",
      label: "url",
    },
    {
      type: "image",
      name: "avatar",
      label: "avatar",
      ui: {
        uploadDir: imageUploadDir,
      }
    },
  ] as TinaField[];
}
export function proyectoFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
      isTitle: true
    },
    {
      type: "boolean",
      name: "listado",
      label: "listado",
    },
    {
      type: "string",
      name: "anio",
      label: "anio",
    },
    {
      type: "image",
      name: "thumbnail",
      label: "Thumbnail",
      ui: {
        uploadDir: imageUploadDir,
      }
    },
    {
      type: "boolean",
      name: "premiere",
      label: "premiere",
    },
    {
      type: "string",
      name: "gifs_hashtag",
      label: "premiere (GIFs)",
    },
    {
      type: "object",
      name: "galeria",
      label: "Galeria",
      fields: [
        {
          type: "boolean",
          name: "stack",
          label: "stack",
        },
        {
          type: "object",
          name: "autores",
          list: true,
          ui: {
            itemProps: (item) => {
              // Field values are accessed by item?.<Field name>
              return { label: item?.nombre };
            },
          },
          fields: [
            {
              type: "string",
              name: "nombre",
              label: "nombre",
              isTitle: true,
              required: true,
            },
            {
              type: "string",
              name: "url",
              label: "url",
            },
            {
              type: "string",
              name: "video",
              label: "video",
            },
            {
              type: "image",
              name: "imagenes",
              label: "imagenes",
              list: true,
              ui: {
                uploadDir: imageUploadDir,
              }
            },
          ],
        },
      ],
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true,
    },
    {
      type: "string",
      name: "bg_color",
      label: "Background color",
      ui: {
        component: "color",
      },
    },
    {
      type: "string",
      name: "fg_color",
      label: "Foreground color",
      ui: {
        component: "color",
      },
    },
  ] as TinaField[];
}
export function single_pageFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "title",
      isTitle: true,
      required: true,
    },
  ] as TinaField[];
}
export function configFields() {
  return [
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
  ] as TinaField[];
}
