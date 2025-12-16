/**
 * Highlights text matches in a string by wrapping them in mark elements
 *
 * @param text - The text to search
 * @param regex - The pattern to match and highlight
 * @param markClassName - CSS class(es) to apply to the mark elements
 * @returns DocumentFragment with text nodes and optionally mark elements for matches
 */
export function highlightTextMatches(
  text: string,
  regex: RegExp,
  className: string
): DocumentFragment {
  const fragment = document.createDocumentFragment();
  let lastIndex = 0;

  text.replace(regex, (match, offset) => {
    // Add text before match
    if (offset > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
    }

    // Add mark element around matches
    const mark = document.createElement('mark');
    mark.className = className;
    mark.textContent = match;
    fragment.appendChild(mark);

    lastIndex = offset + match.length;
    return match;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  return fragment;
}
