import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RmCharacter, RmPaginated } from './types';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RmService {
  constructor(private http: HttpService) {}

  async listCharacters(page = 1, name?: string) {
    const params: Record<string, any> = { page };
    if (name) params.name = name;

    const { data } = await firstValueFrom(
      this.http.get<RmPaginated<RmCharacter>>('/character', { params })
    );
    // Mapeamos só o que o frontend precisa (pode ajustar)
    return {
      info: data.info,
      results: data.results.map((c) => ({
        id: c.id,
        name: c.name,
        status: c.status,
        species: c.species,
        gender: c.gender,
        origin: c.origin?.name ?? '',
        location: c.location?.name ?? '',
        image: c.image,
      })),
    };
  }

  async getCharacter(id: number) {
    const { data } = await firstValueFrom(
      this.http.get<RmCharacter>(`/character/${id}`)
    );
    return {
      id: data.id,
      name: data.name,
      status: data.status,
      species: data.species,
      gender: data.gender,
      origin: data.origin?.name ?? '',
      location: data.location?.name ?? '',
      image: data.image,
      created: data.created,
    };
  }

  async getStats() {
    // Apenas cabeçalhos "info.count" importam; chamadas paralelas ajudam.
    const [chars, eps, locs] = await Promise.all([
      firstValueFrom(this.http.get('/character')),
      firstValueFrom(this.http.get('/episode')),
      firstValueFrom(this.http.get('/location')),
    ]);

    return {
      totalCharacters: chars.data?.info?.count ?? 0,
      totalEpisodes: eps.data?.info?.count ?? 0,
      totalLocations: locs.data?.info?.count ?? 0,
    };
  }
}
