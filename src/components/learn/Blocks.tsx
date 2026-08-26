import type { Block } from '../../content/learn';
import { AssetFigure } from '../shared';

/**
 * Renders one lesson block. The switch is exhaustive over the `Block` union, so
 * adding a kind without a renderer is a compile error rather than a blank space
 * in a lesson.
 */
function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'text':
      return <p className="lesson-text">{block.text}</p>;
    case 'heading':
      return <h3 className="lesson-heading">{block.text}</h3>;
    case 'list':
      return block.ordered ? (
        <ol className="lesson-list">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ol>
      ) : (
        <ul className="lesson-list">
          {block.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      );
    case 'definition':
      return (
        <dl className="definition">
          <dt>{block.term}</dt>
          <dd>{block.text}</dd>
        </dl>
      );
    case 'callout':
      return (
        <aside className={`callout callout-${block.tone}`} aria-label={block.title ?? (block.tone === 'warning' ? 'Caution' : 'Technique')}>
          <p className="callout-kicker">{block.tone === 'warning' ? 'Caution' : 'Technique'}</p>
          {block.title && <p className="callout-title">{block.title}</p>}
          <p className="callout-text">{block.text}</p>
        </aside>
      );
    case 'table':
      // The scroller, not the page, absorbs a table too wide for the viewport.
      return (
        <div
          className="lesson-table-scroll"
          role="region"
          aria-label={block.caption ?? 'Table'}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            event.currentTarget.scrollBy({ left: event.key === 'ArrowLeft' ? -64 : 64 });
          }}
        >
          <table className="lesson-table">
            {block.caption && <caption>{block.caption}</caption>}
            <thead>
              <tr>{block.headers.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join('|')}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'figure':
      return <AssetFigure assetId={block.assetId} caption={block.caption} className="lesson-figure" />;
    default: {
      // Narrows to `never` only while every kind above is handled, so removing
      // a case or adding a kind is a type error instead of a blank space in a
      // lesson. React renders `undefined` happily, so nothing else catches it.
      const unhandled: never = block;
      return unhandled;
    }
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="lesson-blocks">
      {blocks.map((block, index) => <BlockView key={index} block={block} />)}
    </div>
  );
}
