import { fingridFetch } from "@/utils/fetch";
import { logger } from "@/utils/logger";

export default async function HomePage() {
  logger.info("Rendering Home page");

  const health = await fingridFetch("/health");

  return (
    <main className="">
      {health.ok ? <p>API is up!</p> : <p>API is down!</p>}
    </main>
  );
}
