export function DeleteOverlay({
  actionOnClickYes,
  actionOnClickNo,
  title,
  description,
}) {
  return (
    <div className="flex flex-col px-4">
      <h1>{title}</h1>
      <h2 className="my-4">{description}</h2>
    </div>
  );
}
