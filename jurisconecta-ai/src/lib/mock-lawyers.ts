export type Lawyer = {
  id: number;
  name: string;
  specialty: string; // Deve corresponder à "area_direito" da IA
  oab: string;
  city: string;
  rating: number;
  imageUrl: string;
};

export const mockLawyers: Lawyer[] = [
  {
    id: 1,
    name: 'Dra. Carolina Mendes',
    specialty: 'Direito de Família',
    oab: 'OAB/SP 123.456',
    city: 'São Paulo, SP',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop', // Foto aleatória de uma mulher
  },
  {
    id: 2,
    name: 'Dr. Ricardo Almeida',
    specialty: 'Direito do Consumidor',
    oab: 'OAB/RJ 789.012',
    city: 'Rio de Janeiro, RJ',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop', // Foto aleatória de um homem
  },
  {
    id: 3,
    name: 'Dr. Fernando Costa',
    specialty: 'Direito Imobiliário',
    oab: 'OAB/MG 345.678',
    city: 'Belo Horizonte, MG',
    rating: 4.9,
    imageUrl: 'https://plus.unsplash.com/premium_photo-1672239496290-5061cfee7ebb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987', // Foto aleatória de um homem
  },
  {
    id: 4,
    name: 'Dra. Beatriz Lima',
    specialty: 'Direito do Consumidor',
    oab: 'OAB/RS 901.234',
    city: 'Porto Alegre, RS',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?q=80&w=1888&auto=format&fit=crop', // Foto aleatória de uma mulher
  }
];