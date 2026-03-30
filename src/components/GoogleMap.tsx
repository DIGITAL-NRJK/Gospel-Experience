interface GoogleMapProps {
  query: string;
  title?: string;
  className?: string;
}

export default function GoogleMap({ query, title = "Localisation", className = "" }: GoogleMapProps) {
  const src = `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(query)}`;
  const fallbackSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className={`rounded-[20px] overflow-hidden ${className}`}>
      <iframe
        src={fallbackSrc}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "280px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}
