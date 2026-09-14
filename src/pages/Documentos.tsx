import { useMemo, useState } from "react";
import { formatSpanishDate } from "../lib/date";
import { SITE_DOCUMENTS } from "../lib/siteContent";

const ALL_CATEGORIES = "Todos";

export default function Documentos() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const categories = [ALL_CATEGORIES, ...new Set(SITE_DOCUMENTS.map((document) => document.category))];

  const documents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return SITE_DOCUMENTS.filter((document) => {
      const matchesCategory = category === ALL_CATEGORIES || document.category === category;
      const searchableText = `${document.title} ${document.category} ${document.description}`.toLowerCase();
      return matchesCategory && searchableText.includes(normalizedQuery);
    });
  }, [category, query]);

  const countLabel = documents.length === 1 ? "documento disponible" : "documentos disponibles";

  return (
    <div className="documents-page">
      <section className="documents-hero">
        <div>
          <p>INFORMACIÓN PARA ASOCIADOS</p>
          <h1>Centro de documentos</h1>
          <span>Encuentra formularios, certificados, estatutos, tarifas y reglamentos en un solo lugar.</span>
        </div>
      </section>

      <section className="documents-content" aria-label="Documentos disponibles">
        <div className="documents-toolbar">
          <label>
            <span className="sr-only">Buscar documento</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre o tema..."
            />
          </label>
          <div className="documents-filters" aria-label="Filtrar documentos">
            {categories.map((item) => (
              <button key={item} type="button" className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <p className="documents-count">{documents.length} {countLabel}</p>

        {documents.length ? (
          <div className="documents-grid">
            {documents.map((document) => {
              const isExternalFile = document.fileUrl?.startsWith("http");
              const actionLabel = document.fileUrl ? "Descargar documento" : document.action;

              return (
                <article key={document.title}>
                  <span className="documents-icon" aria-hidden="true">▤</span>
                  <p className="documents-category">{document.category}</p>
                  <h2>{document.title}</h2>
                  <p>{document.description}</p>
                  <time dateTime={document.updatedAt}>Actualizado: {formatSpanishDate(document.updatedAt)}</time>
                  <a
                    href={document.fileUrl ?? document.href}
                    download={document.fileUrl ? document.downloadName ?? true : undefined}
                    target={isExternalFile ? "_blank" : undefined}
                    rel={isExternalFile ? "noreferrer" : undefined}
                  >
                    {actionLabel} <span aria-hidden="true">→</span>
                  </a>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="documents-empty">
            <span>⌕</span>
            <h2>No encontramos documentos</h2>
            <p>Prueba con otro término o elimina el filtro seleccionado.</p>
          </div>
        )}
      </section>
    </div>
  );
}
