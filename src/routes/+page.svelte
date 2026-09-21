<script lang="ts">
  import { onMount } from "svelte";
  let assignmentCollapsed = $state(false);
  let showImageOverlay = $state(false);
  let wasProfilePictureEverSelected = $state(false);

  onMount(() => {
    // @ts-ignore
    const pfpSelector: any = document.querySelector("#profileImageSelector");
    const preview: any = document.querySelector("#preview");

    pfpSelector?.addEventListener("change", () => {
      const pfpFile = pfpSelector.files[0]!;

      preview.src = URL.createObjectURL(pfpFile);
      preview.alt = preview.title = pfpFile.name;

      showImageOverlay = true;
      wasProfilePictureEverSelected = true;
    });
  });
</script>

<div
  class={!assignmentCollapsed
    ? "w-full px-20 h-screen grid bg-black text-white maingrid"
    : "w-full px-20 h-screen grid bg-black text-white maingridcollapsed"}
>
  {#key assignmentCollapsed}
    <div
      class="gridsandwich bg-zinc-900 m-4 p-2 rounded-lg border-zinc-700 border-solid border-2 flex justify-between"
    >
      <div class="text-3xl text-zinc-400 font-bold">Attennda</div>

      <div>
        <button
          onclick={() => {
            alert("hi");
          }}
          class="text-2xl align-center text-zinc-200"
          aria-label=" "
        ></button>
      </div>
    </div>
    <div
      class="bg-zinc-900 m-4 my-2 p-2 rounded-lg border-zinc-700 border-solid flex flex-col border-2"
    >
      <div
        class="border-b-3 rounded-b relative border-solid pb-2 border-zinc-700 text-2xl text-center text-zinc-300"
      >
        {!assignmentCollapsed ? "Enter Manually" : ""}

        {#if !assignmentCollapsed}
          <div class="absolute left-2 text-3xl inline">+</div>
        {/if}

        {#if assignmentCollapsed}
          +
        {/if}
      </div>

      <!-- main content -->
      {#if !assignmentCollapsed}
        <div class="m-auto pt-15">
          <div class="m-auto grid place-items-center">
            <div class="relative overflow-hidden cursor-pointer">
              <div
                id="addImageOverlay"
                class={!showImageOverlay
                  ? "absolute inset-0 bg-black/50 flex flex-col justify-center p-4 w-30 transition-opacity duration-300"
                  : "absolute inset-0 bg-black/50 flex flex-col justify-center p-4 w-30 opacity-0 hover:opacity-1 transition-opacity duration-300"}
              >
                <div class="text-white font-bold text-center text-xl">
                  ADD IMAGE
                </div>
              </div>

              <input
                id="profileImageSelector"
                class="absolute inset-0 bg-black/50 flex flex-col justify-center p-4 w-30 opacity-0 cursor-pointer"
                onmouseenter={() => {
                  showImageOverlay = false;
                }}
                onmouseleave={() => {
                  if (wasProfilePictureEverSelected) showImageOverlay = true;
                }}
                type="file"
                accept="image/*"
              />

              <img
                src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                class="w-30 h-30 rounded-md object-cover border-solid border-2 border-zinc-600"
                alt="Profile"
                id="preview"
              />
            </div>
          </div>

          <div class="m-auto grid grid-cols-1 place-items-center">
            <input
              placeholder="Name"
              class="bg-black/45 mt-5 p-1.5 rounded-md"
            />

            <button
              class="bg-black/45 mt-2 rounded-md w-fit px-4 py-1 cursor-pointer"
              >CHECK IN</button
            >
          </div>
        </div>
      {/if}

      {#if assignmentCollapsed}
        <button
          onclick={() => {
            assignmentCollapsed = false;
          }}
          class="text-zinc-400 align-bottom mt-auto cursor-pointer"
          >&#9654;</button
        >
      {/if}

      {#if !assignmentCollapsed}
        <button
          onclick={() => {
            assignmentCollapsed = true;
          }}
          class="text-zinc-400 align-bottom mt-auto ml-auto cursor-pointer"
          >Collapse panel &#9664;</button
        >
      {/if}
    </div>
    <div
      id="attendees"
      class="bg-zinc-900 m-4 my-2 p-2 rounded-lg border-zinc-700 border-solid border-2"
    >
      <div
        class="border-b-3 rounded-b relative border-solid pb-2 border-zinc-700 text-2xl text-center text-zinc-300"
      >
        Attendees
      </div>
      <div
        class="bg-zinc-900 mt-5 m-4 my-2 p-2 text-center w-fit rounded-md border-zinc-700 border-solid border-2"
      >
        <img
          alt="Attendee profile"
          src="https://4helio.xyz/uploads/ms.png"
          class="border-solid border-2 border-zinc-600 w-32 h-32 mb-2 object-cover rounded"
        />
        Helio
      </div>
    </div>
    <div
      class="gridsandwich bg-zinc-900 m-4 p-2 rounded-lg border-zinc-700 border-solid border-2"
    >
      <div>Attennda is operating normally with no issues.</div>
      <div class="text-zinc-400">&copy; Attennda 2026</div>
    </div>
  {/key}
</div>
