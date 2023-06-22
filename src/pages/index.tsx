import PokemonEntry from "@/components/PokemonEntry";
import { useRouter } from "next/router";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import useSWR from "swr";
import * as PokemonAPI from "../network/pokemon-api";
import styles from "../styles/MainPage.module.css";
import { InputGroup } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
	const router = useRouter();
	
	const [pokeRequest, setPokeRequest] = useState<string | null>(null);

	const page = parseInt(router.query.page?.toString() || "1");

	const { data, isLoading } = useSWR(["getPokemonPage", page], () => PokemonAPI.getPokemonPage(page));

	if (isLoading) return <Spinner animation="border" className="d-block m-auto" />

	return (
		<div>
			<h1 className="text-center mb-4">Все покемоны от VV17CH3R&apos;а</h1>

			<InputGroup className={`${styles.inputContainer} mb-4`}>
				<Link href={"/" + pokeRequest}>
					<InputGroup.Text
						className={`${styles.search}`}
						id="pokeRequest"
					>
						Искать
					</InputGroup.Text>
				</Link>
				<Form.Control
					className={styles.inputText}
					placeholder="Найти покемона..."
					aria-label="pokeRequest"
					aria-describedby="pokeRequest"
					onChange={e => setPokeRequest(e.target.value)}
				/>
			</InputGroup>

			<Row xs={2} sm={2} lg={3} xl={4} className="g-4">
				{data?.results.map(el => (
					<Col key={el.name}>
						<PokemonEntry name={el.name}></PokemonEntry>
					</Col>
				))
				}
			</Row>
			<div className="d-flex justify-content-center gap-2 mt-4">
				{data?.previous &&
					<div onClick={() => router.push({ query: { ...router.query, page: page - 1 } })} className={styles.back} />
				}
				{data?.next &&
					<div onClick={() => router.push({ query: { ...router.query, page: page + 1 } })} className={styles.next} />
				}
			</div>
		</div>
	)
}
