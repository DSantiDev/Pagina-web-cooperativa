import MEDIA from "../lib/media";

export default function Tutoriales() {
  const hasTutorials = MEDIA.tutorialVideos.length > 0;

  return (
    <div className="tutorials-page">
      <section className="tutorials-hero">
        <div>
          <p>GUÍAS PASO A PASO</p>
          <h1>Aprende a usar COOVITEL</h1>
          <span>Encuentra videos cortos para realizar tus trámites y aprovechar los servicios de la página con facilidad.</span>
        </div>
      </section>

      <main className="tutorials-content" aria-label="Tutoriales disponibles">
        <section className="tutorials-intro">
          <span aria-hidden="true">▶</span>
          <div>
            <h2>¿No sabes cómo hacerlo?</h2>
            <p>Elige un tutorial y sigue las indicaciones a tu ritmo. Los videos incluyen controles para pausar, adelantar o volver a escuchar.</p>
          </div>
        </section>

        {hasTutorials ? (
          <div className="tutorials-grid">
            {MEDIA.tutorialVideos.map((tutorial) => (
              <article key={tutorial.title}>
                <div className="tutorials-video">
                  <video controls preload="metadata" poster={tutorial.thumbnailUrl}>
                    <source src={tutorial.videoUrl} type="video/mp4" />
                    Tu navegador no permite reproducir este video.
                  </video>
                </div>
                <div className="tutorials-card__content">
                  <p>{tutorial.category}<span>{tutorial.duration}</span></p>
                  <h2>{tutorial.title}</h2>
                  <p>{tutorial.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="tutorials-empty">
            <span aria-hidden="true">🎥</span>
            <h2>Próximamente encontrarás tutoriales aquí</h2>
            <p>Estamos preparando guías para que realices tus trámites como asociado con facilidad.</p>
          </section>
        )}
      </main>
    </div>
  );
}
