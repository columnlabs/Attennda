<script lang="ts">
  import Camera from "@lucide/svelte/icons/camera";
  import Trash from "@lucide/svelte/icons/trash";
  import { onMount } from "svelte";
  let assignmentCollapsed = $state(false);
  let showImageOverlay = $state(false);
  let wasProfilePictureEverSelected = $state(false);

  let showDeletionConfirmationPopup = $state(false);

  // bro deadass i hate states they dont even react to .push
  let checkedin = $state([]);

  onMount(() => {
    // i have to ts ignore this bs, i hate squiggly lines under my code.
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

  const checkinProfile = () => {
    // this too
    // @ts-ignore
    const pfpSelector: any = document.querySelector("#profileImageSelector");
    const nameInput: any = document.querySelector("input[placeholder='Name']");
    const preview: any = document.querySelector("#preview");

    if (!nameInput.value.trim() || nameInput.value.trim().length === 0) {
      alert("Please enter your name");
      return;
    }

    (checkedin as any[]) = [
      ...checkedin,
      {
        name: nameInput.value.trim(),
        profilePicture:
          pfpSelector.files[0] || preview.src
            ? pfpSelector.files[0]
              ? URL.createObjectURL(pfpSelector.files[0])
              : preview.src
            : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
      },
    ];
  };

  let showPhotoshoot = $state(false);
  let stream: MediaStream | null = null;

  const posePhotoshoot = async () => {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    setTimeout(() => {
      const cameraPreview: any = document.querySelector("#cameraPreview");
      cameraPreview.srcObject = stream;
    }, 1000);

    showPhotoshoot = true;
  };

  const takePhoto = () => {
    const cameraPreview: any = document.querySelector("#cameraPreview");
    const canvas = document.createElement("canvas");
    canvas.width = cameraPreview.videoWidth;
    canvas.height = cameraPreview.videoHeight;
    const context = canvas.getContext("2d");
    context?.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL("image/png");
    const preview: any = document.querySelector("#preview");
    preview.src = dataURL;
    preview.alt = preview.title = "Taken Photo";
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      stream = null;
    }

    showPhotoshoot = false;
  };
</script>

<div
  class={!assignmentCollapsed
    ? "w-full px-15 h-screen grid bg-black text-white maingrid"
    : "w-full px-15 h-screen grid bg-black text-white maingridcollapsed"}
>
  {#if showPhotoshoot}
    <div
      id="photoshootOverlay"
      class="bg-black/90 absolute inset-0 z-50 flex flex-col justify-center items-center"
    >
      <div class="text-white text-3xl mb-4">Pose for your photo</div>
      <div class="bg-black/70 p-4 rounded-lg">
        <video
          id="cameraPreview"
          autoplay
          playsinline
          class="rounded-lg w-120 scale-x-[-1] h-120 object-fit-cover"
        ></video>
      </div>

      <div>
        <button
          onclick={() => {
            showPhotoshoot = false;
          }}
          class="mt-4 bg-zinc-700 text-white px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onclick={() => {
            takePhoto();
          }}
          class="mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Shoot
        </button>
      </div>
    </div>
  {/if}

  {#if showDeletionConfirmationPopup}
    <div
      class="absolute z-999 min-w-screen min-h-screen bg-black/10 backdrop-blur-md"
    >
      <div
        class="m-auto h-fit absolute inset-0 rounded-lg p-5 border-2 border-zinc-600 bg-zinc-800 w-[25%] overflow-hidden"
      >
        <div class="flex-col">
          <p class="text-lg font-bold block">
            Are you sure you'd like to delete all attendees?
          </p>
          <span class="text-md block"
            >This action is unreversible and you will lose all registered
            attendees. Are you sure you'd like to continue?</span
          >

          <div
            class="bg-zinc-900 w-[calc(100%+40px)] h-[15%] flex-wrap flex flex-col items-start -mx-5 -mb-5 mt-5 p-3"
          >
            <div class="self-end">
              <button
                class="bg-zinc-900 inline border-2 cursor-pointer border-zinc-600 text-white px-2 py-1.5 rounded-lg self-end"
                onclick={() => {showDeletionConfirmationPopup = false}}
              >
                Cancel
              </button>
              <button
                class="bg-black border-2 inline cursor-pointer border-zinc-600 text-white px-2 py-1.5 rounded-lg self-end"
              >
                Okay, I understand
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

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
          aria-label="invisible button"
        >
        </button>
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

            <button
              onclick={posePhotoshoot}
              class="text-zinc-400 cursor-pointer text-center inline-flex p-auto items-center align-center"
            >
              <Camera />
              <div class="ml-1.5">Take photo</div>
            </button>
          </div>

          <div class="m-auto grid grid-cols-1 place-items-center">
            <input
              placeholder="Name"
              class="bg-black/45 mt-5 p-1.5 rounded-md"
            />

            <button
              class="bg-black/45 mt-2 rounded-md w-fit px-4 py-1 cursor-pointer"
              onclick={checkinProfile}>CHECK IN</button
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
    {#key checkedin}
      <div
        id="attendees"
        class="bg-zinc-900 m-4 my-2 p-2 rounded-lg border-zinc-700 border-solid border-2 min-h-0 flex flex-col"
      >
        <div
          class="border-b-3 rounded-b relative border-solid pr-3.5 pb-2 border-zinc-700 text-2xl text-center text-zinc-300"
        >
          <span>Attendees</span>
          <button
            class="absolute top-1 right-2.25"
            onclick={() => (checkedin = [])}
          >
            <Trash />
          </button>
        </div>

        <div class="grid grid-cols-4 flex-1 min-h-0 overflow-y-auto p-2">
          <!-- <div
            class="bg-zinc-900 mt-5 m-4 my-2 p-2 h-fit text-center w-fit inline-block rounded-md border-zinc-700 border-solid border-2"
          >
            <img
              alt="Attendee profile"
              src="https://4helio.xyz/uploads/ms.png"
              class="border-solid border-2 border-zinc-600 w-32 h-32 mb-2 object-cover rounded"
            />
            Helio
          </div> -->

          {#if checkedin.length === 0}
            <div
              class="text-zinc-400 text-2xl w-fit justify-self-center col-span-full self-center"
            >
              Waiting patiently for an attendee...
            </div>
          {/if}

          {#each checkedin as any[] as attendee}
            <div
              class="bg-zinc-900 mt-5 m-4 my-2 p-2 text-center h-fit w-fit inline-block rounded-md border-zinc-700 border-solid border-2"
            >
              <img
                alt="Attendee profile"
                src={attendee.profilePicture}
                class="border-solid border-2 border-zinc-600 w-32 h-32 mb-2 object-cover rounded"
              />
              {attendee.name}
            </div>
          {/each}
        </div>
      </div>
    {/key}
    <div
      class="gridsandwich bg-zinc-900 m-4 p-2 rounded-lg border-zinc-700 border-solid border-2"
    >
      <div>Attennda is operating normally with no issues.</div>
      <div class="text-zinc-400">&copy; Attennda 2026</div>
    </div>
  {/key}
</div>
