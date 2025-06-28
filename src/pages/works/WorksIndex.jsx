import React from 'react'
import { Link } from 'react-router-dom'

const works = [
  {
    title: 'Tarot Tree of Life',
    ensemble: 'Mixed Ensemble',
    year: 2024,
    slug: 'tarot-tree-of-life',
    performances: ['Modesto New Music Collective (2024)', 'Crux Studio Reading (2023)']
  },
  {
    title: 'To Autumn',
    ensemble: 'Pierrot Ensemble',
    year: 2023,
    slug: 'to-autumn',
    performances: ['Fresno State New Music Ensemble (2023)']
  },
  {
    title: 'Unearthing Home',
    ensemble: 'Art Song',
    year: 2023,
    slug: 'unearthing-home',
    performances: ['Fresno Art Song Series (2024)']
  }
]

export default function WorksIndex() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">All Works</h1>
      <ul className="space-y-6">
        {works.map(({ title, slug, ensemble, year, performances }) => (
          <li key={slug}>
            <Link to={`/works/${slug}`} className="text-xl font-semibold text-primary hover:underline">
              {title}
            </Link>
            <p className="text-sm italic">{ensemble} — {year}</p>
            <ul className="list-disc ml-6 mt-2 text-sm">
              {performances.map((p, idx) => <li key={idx}>{p}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
