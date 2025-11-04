import { Instagram, Youtube } from 'lucide-react'
import Image from 'next/image'

interface TeamCardProps {
  name: string
  description: string
  established: string
  image: string
  instagram?: string
  instagram2?: string
  youtube?: string
}

export default function TeamCard({
  name,
  description,
  established,
  image,
  instagram,
  instagram2,
  youtube,
}: TeamCardProps) {
  return (
    <div className="guest-teams-card">
      <div className="guest-teams-image">
        <Image
          src={image}
          alt={`${name} team`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="guest-teams-content">
        <h3 className="guest-teams-name">{name}</h3>
        {description && (
          <p className="guest-teams-team-description">{description}</p>
        )}
        <div className="guest-teams-footer">
          {established && (
            <span className="guest-teams-established">{established}</span>
          )}
          {(instagram || instagram2 || youtube) && (
            <div className="guest-teams-social">
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guest-teams-social-link"
                  aria-label={`${name} Instagram`}
                >
                  <Instagram className="guest-teams-social-icon" size={16} />
                </a>
              )}
              {instagram2 && (
                <a
                  href={instagram2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guest-teams-social-link"
                  aria-label={`${name} Instagram 2`}
                >
                  <Instagram className="guest-teams-social-icon" size={16} />
                </a>
              )}
              {youtube && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guest-teams-social-link"
                  aria-label={`${name} YouTube`}
                >
                  <Youtube className="guest-teams-social-icon" size={16} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
