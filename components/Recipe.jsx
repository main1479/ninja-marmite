import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsStopwatch } from 'react-icons/bs';

export default function Recipe({ fields }) {
	const router = useRouter();
	const { cookingTime, thumbnail, title, slug, description } = fields;
	return (
		<div className="card">
			<figure className="card__image" onClick={() => router.push('/recipes/' + slug)}>
				<Image src={'https:' + thumbnail.fields.file.url} alt={title} layout="fill" />
			</figure>
			<div className="card__content">
				<h2 className="card__title" onClick={() => router.push('/recipes/' + slug)}>
					{title}
				</h2>
				<p className="card__description">{description.substr(0, 100)}</p>
				<div className="cooking__details">
					<BsStopwatch />
					<p className="time">{cookingTime} Minuts</p>
					<p className="course" onClick={() => router.push('/recipes/' + slug)}>
						View Full Recipe
					</p>
				</div>
			</div>
		</div>
	);
}
