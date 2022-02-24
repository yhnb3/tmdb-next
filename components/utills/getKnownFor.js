export default function getKnownFor(knownFor) {
  return knownFor
    .map((content, idx) =>
      idx !== knownFor.length - 1
        ? `${content.title || content.name}, `
        : content.title || content.name
    )
    .join("");
}
