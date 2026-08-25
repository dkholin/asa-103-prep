import { useEffect, useState, type ReactNode } from 'react';
import type { Question } from '../content/types';
import { assetById, assetUrl } from '../lib/assets';

function AssetCredit({
  creator,
  license,
  licenseUrl,
  sourcePage,
  attributionText,
  modificationNote,
}: {
  creator: string;
  license: string;
  licenseUrl?: string;
  sourcePage: string;
  attributionText?: string;
  /** CC BY / BY-SA require that changes to the work be indicated alongside the credit. */
  modificationNote?: string;
}) {
  return (
    <span className="asset-credit-text">
      Photo: {attributionText ?? creator} ·{' '}
      <a href={sourcePage} target="_blank" rel="noreferrer">Image source</a>
      {' · '}
      {licenseUrl ? <a href={licenseUrl} target="_blank" rel="noreferrer">{license}</a> : license}
      {modificationNote && ` · ${modificationNote}`}
    </span>
  );
}

/**
 * Full-screen click-to-enlarge overlay for a figure image. Several sourced
 * references (NOAA chart-symbol tables, buoyage diagrams) carry small print
 * that isn't legible at the figure column's fixed width, so every figure is
 * enlargeable on click/Enter; Escape or clicking the backdrop closes it.
 */
function Lightbox({
  src,
  alt,
  credit,
  onClose,
}: {
  src: string;
  alt: string;
  credit?: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Enlarged figure">
      <button className="lightbox-close" onClick={onClose} aria-label="Close enlarged figure">
        &times;
      </button>
      <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
        <img className="lightbox-img" src={src} alt={alt} />
        {credit && <figcaption className="lightbox-credit">{credit}</figcaption>}
      </figure>
    </div>
  );
}

/**
 * The asset half of a figure: manifest lookup, alt text, licence attribution,
 * and click-to-enlarge. Shared by question figures and Learn lesson figures so
 * the licensing and lightbox logic exists once. `className` is additive — the
 * `question-figure` styling applies to every caller.
 */
export function AssetFigure({
  assetId,
  caption,
  className,
}: {
  assetId: string;
  caption?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const asset = assetById(assetId);
  if (!asset) return null;
  const dark = asset.theme === 'dark';
  const src = assetUrl(assetId);
  const alt = asset.altText;
  const credit = asset.attributionRequired ? (
    <AssetCredit
      creator={asset.creator}
      license={asset.license}
      licenseUrl={asset.licenseUrl}
      sourcePage={asset.sourcePage}
      attributionText={asset.attributionText}
      modificationNote={asset.modified ? asset.modificationNote : undefined}
    />
  ) : null;
  const classes = ['question-figure', className, dark ? 'theme-dark' : ''].filter(Boolean).join(' ');
  return (
    <figure className={classes}>
      <button
        type="button"
        className="figure-zoom-trigger"
        onClick={() => setOpen(true)}
        aria-label={`Enlarge figure: ${alt}`}
      >
        <img src={src} alt={alt} />
        <span className="figure-zoom-hint">Click to enlarge</span>
      </button>
      {(caption || credit) && (
        <figcaption className="asset-credit">
          {caption && <span className="figure-caption">{caption}</span>}
          {credit}
        </figcaption>
      )}
      {open && <Lightbox src={src} alt={alt} credit={credit} onClose={() => setOpen(false)} />}
    </figure>
  );
}

export function QuestionFigure({ question }: { question: Question }) {
  if (question.format !== 'visual' || !question.assetId) return null;
  return <AssetFigure assetId={question.assetId} />;
}

/**
 * Renders the question prompt beside (desktop) or above (narrow viewports) its
 * figure, when the question has one. Falls back to a plain question body when
 * there is no visual.
 */
export function QuestionLayout({
  question,
  children,
}: {
  question: Question;
  children: ReactNode;
}) {
  const hasFigure = question.format === 'visual' && !!question.assetId && !!assetById(question.assetId);
  return (
    <div className={`question-with-figure ${hasFigure ? 'has-figure' : ''}`}>
      {hasFigure && <QuestionFigure question={question} />}
      <div className="question-body">
        <p className="prompt">{question.prompt}</p>
        {children}
      </div>
    </div>
  );
}

export function ChoiceList(props: {
  question: Question;
  selected: string | null;
  onSelect: (choiceId: string) => void;
  disabled?: boolean;
  /** When set, the submitted choice id — used to mark correct/wrong choices visually. */
  revealed?: string | null;
}) {
  const { question, revealed } = props;
  return (
    <div className="choices" role="radiogroup" aria-label="Answer choices">
      {question.choices.map((c) => {
        let stateClass = '';
        let mark: string | null = null;
        if (revealed) {
          if (c.id === question.correctChoiceId) {
            stateClass = 'result-correct';
            mark = 'Correct answer';
          } else if (c.id === revealed) {
            stateClass = 'result-chosen-wrong';
            mark = 'Your answer';
          } else {
            stateClass = 'result-inert';
          }
        }
        return (
          <label
            key={c.id}
            className={`choice ${props.selected === c.id ? 'selected' : ''} ${stateClass}`}
          >
            <input
              type="radio"
              name={`choice-${question.id}`}
              value={c.id}
              checked={props.selected === c.id}
              disabled={props.disabled}
              onChange={() => props.onSelect(c.id)}
            />
            <span className="choice-text">{c.text}</span>
            {mark && <span className="choice-mark">{mark === 'Correct answer' ? '✓ ' : '✗ '}{mark}</span>}
          </label>
        );
      })}
    </div>
  );
}

export function Feedback({ question, chosenId }: { question: Question; chosenId: string }) {
  const correct = chosenId === question.correctChoiceId;
  const correctChoice = question.choices.find((c) => c.id === question.correctChoiceId)!;
  const chosen = question.choices.find((c) => c.id === chosenId);
  return (
    <div className={`feedback ${correct ? 'feedback-correct' : 'feedback-wrong'}`}>
      <p className="verdict">{correct ? 'Correct' : 'Incorrect'}</p>
      {!correct && (
        <p className="answer-line">
          Correct answer: <strong>{correctChoice.text}</strong>
        </p>
      )}
      {!correct && chosen?.whyWrong && (
        <p className="why-wrong">Why your answer is wrong: {chosen.whyWrong}</p>
      )}
      <p className="explanation-text">{question.explanation}</p>
      <p className="meta source">Source: {question.source}</p>
    </div>
  );
}

export function ProgressBar({ value, max, complete }: { value: number; max: number; complete?: boolean }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div className={`progress-fill ${complete ? 'complete' : ''}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

export function readinessLabel(mastered: number, total: number, attempted: number): string {
  if (attempted === 0) return 'Not started';
  if (mastered === total) return 'Solid';
  return 'In progress';
}

export function readinessChipClass(label: string): string {
  return `chip chip-${label.replace(' ', '-').toLowerCase()}`;
}
