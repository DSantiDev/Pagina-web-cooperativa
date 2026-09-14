# Documentos descargables

Guarda aquí los archivos que los asociados podrán descargar desde el Centro de documentos.

## Cómo publicar uno

1. Copia el archivo en esta carpeta. Ejemplo: `estatuto-coovitel.pdf`.
2. Abre `src/lib/siteContent.ts`.
3. Agrega o actualiza un elemento de `SITE_DOCUMENTS` con estos campos:

```ts
{
  title: "Estatutos de COOVITEL",
  category: "Estatutos",
  description: "Descripción breve del documento.",
  updatedAt: "2026-09-11",
  href: "/normatividad",
  action: "Descargar PDF",
  fileUrl: "/documentos/estatuto-coovitel.pdf",
  downloadName: "estatuto-coovitel.pdf",
}
```

El campo `fileUrl` activa la descarga real tanto en el Centro de documentos
como en Confianza → Transparencia → Informes de gestión. Usa nombres simples: minúsculas,
guiones y sin espacios. No reemplaces un archivo que ya esté enlazado: sube una
nueva versión y actualiza la fecha para conservar control de cambios.
