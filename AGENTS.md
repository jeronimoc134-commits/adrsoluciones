<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the architecture portfolio on the public index route, with independently scoped contact and video-experience components so visual interactions stay separate from lead storage.
- Store contact submissions through a validated public server function using a handler-local privileged client; allow no browser read access to protect visitor details.
- Use supplied media through asset pointers and keep architectural project labels descriptive rather than inventing client names or locations.
