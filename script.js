const ctx = new AudioContext();
const gain = ctx.createGain();
let audiobuffer = null;

gain.connect(ctx.destination);

document
  .getElementById("fileUpload")
  .addEventListener("change", async (event) => {
    let file = event.target.files[0];
    let arraybuf = await file.arrayBuffer();
    audiobuffer = await ctx.decodeAudioData(arraybuf);
    console.log(audiobuffer);
  });

document.getElementById("play").addEventListener("click", () => {
  if (audiobuffer) {
    let sourcenode = ctx.createBufferSource();
    sourcenode.buffer = audiobuffer;
    sourcenode.connect(gain);
    sourcenode.start();
  }
});
