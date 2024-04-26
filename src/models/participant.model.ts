export interface Participant {
  id: number,
  name: string,
  email?: string,
  policy: ParticipantPolicy,
  createdAt: Date,
  tripId: number,
  isOwner?: boolean
}

export interface IParticipantRequest {
  name: string,
  email?: string,
  policy: ParticipantPolicy,
  tripId: string
}

export enum ParticipantPolicy {
  READ = 'read',
  WRITE = 'write'
}
