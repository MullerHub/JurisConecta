export type Lawyer = {
    id: number;
    name: string;
    specialty: string;
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
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Dr. Ricardo Almeida',
        specialty: 'Direito do Consumidor',
        oab: 'OAB/RJ 789.012',
        city: 'Rio de Janeiro, RJ',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Dr. Fernando Costa',
        specialty: 'Direito Imobiliário',
        oab: 'OAB/MG 345.678',
        city: 'Belo Horizonte, MG',
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1596245173966-10a383a8a3a0?q=80&w=1887&auto=format&fit=crop',
    },
    {
        id: 4,
        name: 'Dra. Beatriz Lima',
        specialty: 'Direito do Consumidor',
        oab: 'OAB/RS 901.234',
        city: 'Porto Alegre, RS',
        rating: 5.0,
        imageUrl: 'https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?q=80&w=1888&auto=format&fit=crop',
    },
    {
        id: 5,
        name: 'Dr. Marcos Oliveira',
        specialty: 'Direito Penal',
        oab: 'OAB/BA 555.444',
        city: 'Salvador, BA',
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
    },
    {
        id: 6,
        name: 'Dra. Juliana Ferreira',
        specialty: 'Direito do Trabalho',
        oab: 'OAB/PR 333.222',
        city: 'Curitiba, PR',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
    },
    {
        id: 7,
        name: 'Dr. Lucas Martins',
        specialty: 'Direito Tributário',
        oab: 'OAB/DF 101.112',
        city: 'Brasília, DF',
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
    },
    {
        id: 8,
        name: 'Dra. Sofia Ribeiro',
        specialty: 'Direito Empresarial',
        oab: 'OAB/SC 212.323',
        city: 'Florianópolis, SC',
        rating: 5.0,
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    },
    {
        id: 9,
        name: 'Dr. Mateus Gonçalves',
        specialty: 'Direito Civil',
        oab: 'OAB/PE 434.545',
        city: 'Recife, PE',
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1522529599102-4b320e673c03?q=80&w=1887&auto=format&fit=crop',
    },
];