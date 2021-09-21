import { createClient } from 'contentful';
import { BsStopwatch, BsEggFried } from 'react-icons/bs';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});
export const getStaticPaths = async () => {
	const { items } = await client.getEntries({ content_type: 'recipe' });
	const paths = items.map((item) => ({
		params: {
			slug: item.fields.slug,
		},
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const { items } = await client.getEntries({ content_type: 'recipe', 'fields.slug': params.slug });

	return {
		props: {
			recipe: items[0],
		},
	};
};
import Image from 'next/image';
export default function RecipeDetails({ recipe }) {
	const { title, thumbnail, cookingTime, ingredients, difficulty, method } = recipe.fields;
	console.log(recipe);
	return (
		<div className="single-recipe">
			<figure className="recipe__image">
				<Image src={'https:' + thumbnail.fields.file.url} layout="fill" alt={title} />
			</figure>
			<h1 className="title">{title}</h1>
			<div className="cooking__details">
				<p>
					<BsStopwatch />
					{cookingTime} Minuts
				</p>
				<p>Difficulty: {difficulty}</p>
			</div>
			<h2 className="title">Ingredients</h2>
			<div className="ingredients__list">
				{ingredients.map((item) => (
					<p className="ingredient" key={item}>
						<BsEggFried />
						{item}
					</p>
				))}
			</div>
			<div
				className="single__bg"
				style={{ backgroundImage: `url(https:${thumbnail.fields.file.url})` }}
			>
				&nbsp;
			</div>

			<h2 className="title">Method</h2>
			<div className="method">{documentToReactComponents(method)}</div>
		</div>
	);
}
