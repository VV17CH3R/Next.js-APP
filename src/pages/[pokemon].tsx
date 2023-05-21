import usePokemon from "@/hooks/usePokemon";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import styles from "../styles/PokemonEl.module.css";
import * as PokemonAPI from "../network/pokemon-api";

export default function PokemonDetailsPage() {
    const router = useRouter();
    const pokemonName = router.query.pokemon?.toString() || "";

    const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName);

    async function submitNickname(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const nickname = formData.get("nickname")?.toString().trim();

        if (!pokemon || !nickname) return;

        const update = await PokemonAPI.setMutatePokemon(pokemon, nickname);
        mutatePokemon(update, { revalidate: false });
    }

    return (
        <>
            <Head>
                {pokemon && <title >{`${pokemon.name} - NextJSPoke`}</title>}
            </Head>
            <div className="d-flex flex-column align-items-center">
                {pokemonLoading && <Spinner animation="grow" />}
                {pokemon === null &&
                    <p className={styles.pokemonName}>Pokemon not found
                        <div>
                            <Link href="/" className="link-light">
                                Try again 
                            </Link>
                        </div>
                    </p>}
                {pokemon &&
                    <>
                        <h1 className={`${styles.pokemonName} text-center text-capitalize`}>{pokemon.name}</h1>
                        <Image
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={"Pokemon: " + pokemon.name}
                            width={400}
                            height={400}
                        />
                        <div className="d-inline-block mt-2">
                            <div className={styles.pokemonStats}>
                                <strong>
                                    Types:{" "}
                                </strong>
                                {pokemon.types.map(el => el.type.name).join(", ")}
                                <div><strong>Height: </strong> {pokemon.height * 10} cm</div>
                                <div><strong>Weight: </strong> {pokemon.weight / 10} kg</div>
                            </div>
                        </div>
                        <div className={styles.backButton}>
                            <Link href="/" className="link-light">
                                Comback to list
                            </Link>
                        </div>
                        <Form onSubmit={submitNickname} className="mt-4">
                            <Form.Group 
                                controlId="pokemonMutateInput"
                                className="mb-3">
                                <Form.Label>Give this pokemon a nickname</Form.Label>
                                <Form.Control name="nickname" placeholder="ex. Big Jonny...">

                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" className={styles.addNickButton} >Add nickname</Button>
                        </Form>
                    </>
                }
            </div>
        </>
    );
}