import { formatSpanishDate } from "../lib/date";
import { SITE_NEWS, SITE_OBITUARIES } from "../lib/siteContent";

export default function Actualidad() {
  return (
    <div className="news-page">
      <section className="news-hero">
        <div>
          <p>INFORMACIÓN ACTUALIZADA</p>
          <h1>Novedades y fechas importantes</h1>
          <span>Consulta comunicaciones, cambios y recordatorios importantes para asociados COOVITEL.</span>
        </div>
      </section>

      <section className="news-content">
        <aside className="update-note">
          <span aria-hidden="true">i</span>
          <div>
            <strong>Información sujeta a actualización</strong>
            <p>Verifica las condiciones vigentes antes de tomar decisiones sobre tasas, tarifas, beneficios, convenios u horarios.</p>
          </div>
        </aside>

        <div className="news-timeline">
          {SITE_NEWS.map((news) => (
            <article key={news.title}>
              <time dateTime={news.date}>{formatSpanishDate(news.date)}</time>
              <span className="news-marker" aria-hidden="true" />
              <div>
                <p>{news.category}</p>
                <h2>{news.title}</h2>
                <span>{news.summary}</span>
                <a href={news.href}>Ver información <b aria-hidden="true">→</b></a>
              </div>
            </article>
          ))}
        </div>

        {SITE_OBITUARIES.length > 0 && (
          <section className="solidarity-notices" aria-label="Obituarios">
            <p>OBITUARIOS</p>
            <h2>Nos unimos al dolor de sus familias</h2>
            <div>
              {SITE_OBITUARIES.map((notice) => (
                <article key={`${notice.date}-${notice.title}`}>
                  <span className="solidarity-notices__icon" aria-hidden="true">🕊️</span>
                  <div>
                    <h3>{notice.title}</h3>
                    <strong>{notice.company}</strong>
                    <time dateTime={notice.date}>Falleció el {formatSpanishDate(notice.date)}</time>
                    <p>{notice.message}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
