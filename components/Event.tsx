import Image from 'next/image';

const events = [
  {
    image: '/assets/images/event-1.jpg',
    date: '2022-09-15',
    dateDisplay: '15/09/2022',
    category: 'Food, Flavour',
    title: "Flavour so good you'll try to eat with your eyes."
  },
  {
    image: '/assets/images/event-2.jpg',
    date: '2022-09-08',
    dateDisplay: '08/09/2022',
    category: 'Healthy Food',
    title: "Flavour so good you'll try to eat with your eyes."
  },
  {
    image: '/assets/images/event-3.jpg',
    date: '2022-09-03',
    dateDisplay: '03/09/2022',
    category: 'Recipie',
    title: "Flavour so good you'll try to eat with your eyes."
  }
];

export default function Event() {
  return (
    <section className="section event bg-black-10" aria-label="event">
      <div className="container">
        <p className="section-subtitle label-2 text-center">Recent Updates</p>
        <h2 className="section-title headline-1 text-center">Upcoming Event</h2>

        <ul className="grid-list">
          {events.map((event, index) => (
            <li key={index}>
              <div className="event-card has-before hover:shine">
                <div className="card-banner img-holder" style={{ width: '350px', height: '450px' }}>
                  <Image 
                    src={event.image} 
                    width={350} 
                    height={450} 
                    loading="lazy"
                    alt={event.title} 
                    className="img-cover"
                  />
                  <time className="publish-date label-2" dateTime={event.date}>
                    {event.dateDisplay}
                  </time>
                </div>

                <div className="card-content">
                  <p className="card-subtitle label-2 text-center">{event.category}</p>
                  <h3 className="card-title title-2 text-center">
                    {event.title}
                  </h3>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <a href="#" className="btn btn-primary">
          <span className="text text-1">View Our Blog</span>
          <span className="text text-2" aria-hidden="true">View Our Blog</span>
        </a>
      </div>
    </section>
  );
}

