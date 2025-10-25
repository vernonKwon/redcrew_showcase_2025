import { Instagram, Youtube } from 'lucide-react'

interface TeamCardProps {
  name: string
  description: string
  established: string
  image: string
}

export default function TeamCard({ name, description, established, image }: TeamCardProps) {
  return (
    <div className="guest-teams-card">
      <div className="guest-teams-image">
        <img src={image} alt={`${name} team`} />
      </div>
      <div className="guest-teams-content">
        <h3 className="guest-teams-name">{name}</h3>
        <p className="guest-teams-team-description">{description}</p>
        <div className="guest-teams-footer">
          <span className="guest-teams-established">{established}</span>
          <div className="guest-teams-social">
            <Instagram className="guest-teams-social-icon" size={16} />
            <Youtube className="guest-teams-social-icon" size={16} />
          </div>
        </div>
      </div>
    </div>
  )
}
