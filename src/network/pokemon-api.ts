import { Pokemon, PokemonPage } from "@/models/Pokemon";
import api from "./axiosInstance";

export async function getPokemon(name: string) {
    const response = await api.get<Pokemon>("/pokemon/" + name.toLocaleLowerCase());
    return response.data;
}

export async function getPokemonPage(page: number) {
    const pageSize = 12;
    const response = await api.get<PokemonPage>(`/pokemon?limit=${pageSize}&offset=${pageSize * (page-1)}`);
    return response.data;
}

export async function setMutatePokemon(pokemon: Pokemon, nickname: string) {
    return { ... pokemon, name: nickname };
}