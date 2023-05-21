import * as PokemonApi from "@/network/pokemon-api";
import { AxiosError } from "axios";
import useSWR from "swr";

export default function usePokemon(name: string) {
    const { data, isLoading, mutate } = useSWR(name, async (name) => {
        try {
            return await PokemonApi.getPokemon(name);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) { 
                return null;
            } else {
                throw error;
            }
        }
    });

    return {
        pokemon: data,
        pokemonLoading: isLoading,
        mutatePokemon: mutate,
    }
}