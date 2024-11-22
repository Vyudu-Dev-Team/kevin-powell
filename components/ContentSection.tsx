export default function ContentSection() {
  return (
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-12 gap-8 p-8">
      <div className="md:col-span-8">
        <h2 className="text-3xl md:text-4xl mb-6">
          NO FUZZ, NO BULLSHIT,<br />
          JUST FILMS THAT MAKE<br />
          PEOPLE BUY YOUR STUFF
        </h2>
        <p className="opacity-80">
          Kein Bullshit – nur Filme mit Seele und Handwerkskunst. Wir graben tief und
          zielen hoch - mit Leidenschaft, Mut, Spaß, Koffein, Adrenalin, Dopamin.
        </p>
      </div>
      <div className="md:col-span-4 flex justify-end">
        <p className="vertical-text text-xl opacity-80">
          DIE ANTIPODE ZUR LANGEWEILE
        </p>
      </div>
    </section>
  );
}