import { Instagram, Youtube } from 'lucide-react'

interface TeamCardProps {
  name: string
  description: string
  established: string
  image: string
}

export default function TeamCard({ name, description, established, image }: TeamCardProps) {
  return (
    <div className="guest-teams__card">
      <div className="guest-teams__image">
        <img src={image} alt={`${name} team`} />
      </div>
      <div className="guest-teams__content">
        <h3 className="guest-teams__name">{name}</h3>
        <p className="guest-teams__team-description">{description}</p>
        <div className="guest-teams__footer">
          <span className="guest-teams__established">{established}</span>
          <div className="guest-teams__social">
            <Instagram className="guest-teams__social-icon" size={16} />
            <Youtube className="guest-teams__social-icon" size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}
