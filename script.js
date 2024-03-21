window.onload = function () {
  const animatedImage = document.getElementById("animatedImage");
  const imageCaption = document.getElementById("imageCaption");
  const highlightElement = document.querySelector(".highlight");

  animatedImage.style.width = "150px";
  animatedImage.addEventListener("animationend", () => {
    animatedImage.style.width = "700px";

    requestAnimationFrame(() => {
      animatedImage.style.boxShadow = "5px 5px 20px 5px rgba(0, 0, 0, 0.2)";

      setTimeout(() => {
        highlightElement.classList.add("highlight-animation");
      }, 1500);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const movingUp = currentScrollY < lastScrollY;
    const images = document.querySelectorAll(".app-image");
    const offset = 20;

    images.forEach((img, index) => {
      img.style.transition = "transform 1.5s ease-out"; // Add transition effect
      if (movingUp) {
        img.style.transform = `translateY(${
          index % 2 === 0 ? -offset : offset
        }px)`;
      } else {
        img.style.transform = `translateY(${offset}px)`;
      }
    });

    lastScrollY = currentScrollY;
  });
});

document.addEventListener("scroll", function () {
  const features = document.querySelectorAll(".features");
  features.forEach(function (feature) {
    const { top } = feature.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (top < viewportHeight) {
      feature.style.opacity = 1;
      feature.style.transform = "translateY(0)";
      feature.style.transition = "opacity 2s ease-out, transform 2s ease-out";
    }

    if (top <= 0) {
      feature.style.opacity = 0;
      feature.style.transform = "translateY(20px)";
      feature.style.transition = "none";
    }
  });
});

function showSubtitle(id) {
  // Hide all subtitles
  document.querySelectorAll(".subtitle").forEach(function (div) {
    div.style.display = "none";
  });

  // Show the selected subtitle
  document.getElementById(id).style.display = "block";
}

function toggleSubtitle(answerId) {
  var answer = document.getElementById(answerId);
  var arrowIcon = document.getElementById(answerId + "Arrow");

  if (answer.classList.contains("visible")) {
    answer.classList.remove("visible");
    setTimeout(function () {
      answer.style.display = "none";
    }, 500);
    arrowIcon.src = "./static/img/arrow-down.png";
  } else {
    answer.classList.add("visible");
    answer.style.display = "block";
    answer.style.maxHeight = "none";
    arrowIcon.src = "./static/img/arrow-up.png";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateX(0)";
          }, index * 300); // Reduced delay to 300ms between each book
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".bookcover-image").forEach((img, index) => {
    img.style.opacity = 0;
    img.style.transform = "translateX(50px)";
    // Fix the transition timing to be consistent and immediate
    img.style.transition = `opacity 1s ease-out, transform 1s ease-out`;
    observer.observe(img);
  });
});

document.querySelectorAll(".player-button").forEach((button) => {
  button.addEventListener("click", function () {
    const audio = new Audio(this.getAttribute("data-audio"));
    if (!this.classList.contains("playing")) {
      audio.play();
      this.classList.add("playing");
      this.innerHTML = "Pause"; // Change to pause icon as needed
    } else {
      audio.pause();
      this.classList.remove("playing");
      this.innerHTML = this.getAttribute("data-chapter"); // Change to play icon as needed
    }

    audio.addEventListener("ended", () => {
      this.classList.remove("playing");
      this.innerHTML = this.getAttribute("data-chapter"); // Reset button text/icon
    });
  });
});

let currentAudio = null; // Tracks the current audio object globally
let currentButton = null; // Tracks the current button

document.querySelectorAll(".audio-button").forEach((button) => {
  button.setAttribute("data-chapter-name", button.textContent);

  button.addEventListener("click", function () {
    const audioSrc = this.getAttribute("data-audio");
    const summaryId = this.getAttribute("data-summary");

    if (currentAudio && currentButton === this) {
      if (!currentAudio.paused) {
        currentAudio.pause();
        //this.textContent = "Play";
        this.innerHTML =
          '<img src="./static/img/play.png" alt="Play" style="width: 20px; height: 20px; opacity: 0.7; display: block; margin: auto;">';
      } else {
        currentAudio.play();
        //this.textContent = "Pause";
        this.innerHTML =
          '<img src="./static/img/pause.png" alt="Play" style="width: 20px; height: 20px; opacity: 0.7; display: block; margin: auto;">';
      }
      return;
    }

    if (currentAudio && currentButton && currentButton !== this) {
      currentAudio.pause();

      currentButton.textContent =
        currentButton.getAttribute("data-chapter-name");
    }

    currentButton = this;
    currentAudio = new Audio(audioSrc);
    currentAudio.play();
    //this.textContent = "Pause";
    this.innerHTML =
      '<img src="./static/img/pause.png" alt="Play" style="width: 20px; height: 20px; opacity: 0.7; display: block; margin: auto;">';

    document
      .querySelectorAll(".summary")
      .forEach((summary) => (summary.style.display = "none"));
    document.getElementById(summaryId).style.display = "block";

    currentAudio.onended = () => {
      this.textContent = this.getAttribute("data-chapter-name");
      currentAudio = null;
      currentButton = null;
    };
  });
});

let currentBookIndex = 0;
let currentChapterIndex = 0;
const books = [
  {
    cover: "./static/img/bookcover-13.png",
    chapters: [
      {
        summary:
          "A young man named Raskolnikov, overwhelmed by poverty, paranoia, and hypochondria, reluctantly embarks on a mysterious errand. He visits an old pawnbroker, Alyona Ivanovna, to pawn a silver watch. After a tense negotiation, Raskolnikov leaves feeling agitated. He seeks solace in a tavern, where he encounters a group of drunk men and a retired government clerk. Despite feeling more at ease temporarily, he remains disturbed by his thoughts and actions.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/Crime and Punishment/Crime and Punishment_ch1.mp3",
      },
      {
        summary:
          "Raskolnikov, feeling lonely and weary, seeks company at a tavern. He encounters a disheveled drunk named Marmeladov, who recounts the dire poverty and desperation his family endures, including his daughter, Sonia, who now resorts to prostitution. Marmeladov laments his own failings, wallowing in his predicament. Despite the tragic tale, Marmeladov speaks with hope of redemption, stirring a brief silence among the listeners. Then, he abruptly decides to visit his wife, and Raskolnikov, who had been listening, offers to accompany him. A man, Marmeladov, and Raskolnikov enter a dilapidated room where they find Marmeladov's wife, Katerina Ivanovna, in distress. The family is impoverished and the children are suffering. Marmeladov is accused of drinking away their money, and a chaotic scene unfolds with Marmeladov humiliated and the family in despair. Raskolnikov, feeling conflicted, briefly considers helping but ultimately leaves. As he walks back, he ponders human nature and the suffering around him.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/Crime and Punishment/Crime and Punishment_ch2.mp3",
      },
      {
        summary:
          "Raskolnikov wakes up in his small, rundown room feeling ill-tempered. His landlady has stopped bringing him meals, and the cook, Nastasya, isn't cleaning his room as often. Nastasya wakes him and gives him tea, and he sends her to buy bread and sausage. She brings him cabbage soup instead, and he reluctantly eats it. Nastasya talks to him about his situation, and he admits he's thinking and wants to make a fortune. He receives a letter from his mother, informing him that his sister, Dunya, faced hardship at the Svidrigailovs' house but is now engaged to a man, Pyotr Petrovitch. His mother plans to visit with Dunya soon. Initially emotional, Raskolnikov becomes angry and leaves the room, walking without direction in a disturbed state of mind.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/Crime and Punishment/Crime and Punishment_ch3.mp3",
      },
    ],
  },
  {
    cover: "./static/img/bookcover-2.png",
    chapters: [
      {
        summary:
          " The play opens at the castle in Denmark. Francisco and Bernardo stand guard at the platform. When Bernardo arrives, Francisco leaves. Marcellus and Horatio join them, and they discuss a ghostly apparition of King Hamlet. The ghost appears and beckons Hamlet to follow. Despite his friends' warnings, Hamlet decides to follow the ghost. The play opens at the castle in Denmark. Francisco and Bernardo stand guard at the platform. When Bernardo arrives, Francisco leaves. Marcellus and Horatio join them, and they discuss a ghostly apparition of King Hamlet. The ghost appears and beckons Hamlet to follow. Despite his friends' warnings, Hamlet decides to follow the ghost. The play continues at the castle in Denmark. Hamlet is dismissive of the arrival of the players. He talks to Rosencrantz and Guildenstern, showing signs of madness. Polonius and some players arrive, and Hamlet talks to them about performances, giving them advice on acting. He then talks to Ophelia, telling her to go to a nunnery. Polonius and Claudius plot to see if Hamlet's madness is due to love. The players perform a scene resembling the murder of Hamlet's father.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/The Tragedy of Hamlet, Prince of Denmark/The Tragedy of Hamlet, Prince of Denmark_ch1.mp3",
      },
      {
        summary:
          " Hamlet follows the ghost to a place overlooking the sea despite his friends' warnings. The ghost reveals to him that he is King Hamlet's spirit and shares the story of his murder. The ghost tells Hamlet that he was killed by his brother, who now wears his crown and has married his wife. Hamlet swears to avenge his father's murder. The scene opens with Claudius, Gertrude, Polonius, Ophelia, Rosencrantz, and Guildenstern questioning Hamlet's madness. Hamlet interacts with the players and gives them advice on performing. He also has a tense exchange with Ophelia. The players then put on a play that mirrors the events surrounding King Hamlet's murder. Hamlet watches Claudius closely during this performance.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/The Tragedy of Hamlet, Prince of Denmark/The Tragedy of Hamlet, Prince of Denmark_ch2.mp3",
      },
      {
        summary:
          " Hamlet watches the play closely and has tense exchanges with Ophelia. He mocks Guildenstern, Rosencrantz, and Polonius. He is called before Claudius who plans to send him to England for safety, with Rosencrantz and Guildenstern to accompany him. They discuss Fortinbras' army's purpose and Hamlet's struggle with indecision.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/The Tragedy of Hamlet, Prince of Denmark/The Tragedy of Hamlet, Prince of Denmark_ch3.mp3",
      },
    ],
  },
  {
    cover: "./static/img/bookcover-5.png",
    chapters: [
      {
        summary:
          " There is an old man who has been fishing alone for 84 days without a catch. A boy used to fish with him but now fishes on a lucky boat. The old man maintains hope and confidence. The boy brings him sardines and they discuss fishing and baseball. The next morning, they set out to fish, hoping for a big catch.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/The Old Man and the Sea/The Old Man and the Sea_ch1.mp3",
      },
      {
        summary:
          " The old man rows out to sea, observing the natural surroundings and preparing his lines with precision. He sees a man-of-war bird circling and realizes there are big dolphin and flying fish in the area. He baits his lines and waits for a potential catch.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/The Old Man and the Sea/The Old Man and the Sea_ch2.mp3",
      },
      {
        summary:
          " The old man observes the natural surroundings, reflects on his interactions with the sea, and struggles with a strong and tireless fish. He catches a small tuna, struggles with a large fish for hours, and eventually eats the tuna for strength. He fights against physical pain and discomfort, while also ruminating on his solitude at sea. Ultimately, he finds solace in the signs of good weather and the presence of wildlife around him.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/The Old Man and the Sea/The Old Man and the Sea_ch3.mp3",
      },
    ],
  },
  {
    cover: "./static/img/bookcover-14.png",
    chapters: [
      {
        summary:
          " The summary begins with the meeting between the Weïrd Sisters, Macbeth, and Banquo, where the prophetic greetings are exchanged. Macbeth receives news of his new title, Thane of Cawdor, and Lady Macbeth plans to support him in achieving greater power. The meeting between the Weïrd Sisters, Macbeth, and Banquo occurs. Macbeth receives news of his new title, Thane of Cawdor, and Lady Macbeth plans to support him in achieving greater power. The meeting between the Weïrd Sisters, Macbeth, and Banquo occurs. Macbeth receives news of his new title, Thane of Cawdor, and Lady Macbeth plans to support him in achieving greater power. The meeting between the Weïrd Sisters, Macbeth, and Banquo occurs. Macbeth receives news of his new title, Thane of Cawdor, and Lady Macbeth plans to support him in achieving greater power.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/Macbeth/Macbeth_ch2.mp3",
      },
      {
        summary:
          " Macbeth and Lady Macbeth prepare for King Duncan's arrival at their castle. Lady Macbeth instructs Macbeth to appear welcoming but to secretly plot against King Duncan, setting the stage for the events to come. Macbeth and Lady Macbeth prepare for King Duncan's arrival at their castle. Lady Macbeth instructs Macbeth to plot against King Duncan in secret, setting the stage for the events to come. Macbeth and Lady Macbeth prepare for King Duncan's arrival at their castle. Lady Macbeth instructs Macbeth to plot against King Duncan in secret, setting the stage for the events to come. Macbeth and Lady Macbeth prepare to plot against King Duncan in secret, setting the stage for the events to come.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/Macbeth/Macbeth_ch3.mp3",
      },
      {
        summary:
          " Banquo and Macbeth talk with King Duncan and Lady Macbeth as they prepare for the King's arrival. Macbeth contemplates murdering Duncan but fears the consequences. Lady Macbeth convinces him to proceed with their plan. After Macbeth's coronation as Thane of Cawdor, Banquo suspects foul play, and Macbeth fears Banquo's sons will inherit the throne. Macbeth hires murderers to kill Banquo and his son Fleance. The witches' prophecies begin to influence Macbeth's actions, leading him down a dark path. Macbeth contemplates murdering King Duncan but fears the consequences. Lady Macbeth convinces him to proceed with their plan. After Macbeth's coronation as Thane of Cawdor, he fears Banquo's sons will inherit the throne and hires murderers to kill Banquo and his son Fleance. The witches' prophecies begin to influence Macbeth's actions, leading him down a dark path. Macbeth contemplates murdering King Duncan but fears the consequences. Lady Macbeth convinces him to proceed with their plan and hires murderers to kill Banquo and his son Fleance. The witches' prophecies begin to influence Macbeth's actions, leading him down a dark path.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/Macbeth/Macbeth_ch4.mp3",
      },
    ],
  },
  {
    cover: "./static/img/bookcover-11.png",
    chapters: [
      {
        summary:
          "A man, infatuated with a girl called Lolita, shares his fascination with her many names and recalls a previous summer romance with a younger girl, suggesting it influenced his affection for Lolita. He presents his impassioned feelings and addresses the jury, hinting at a dark twist to the story.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/Lolita/Lolita_ch1.mp3",
      },
      {
        summary:
          "The protagonist, born in 1910 in Paris, describes his diverse heritage and luxurious upbringing in a Riviera hotel owned by his easy-going Swiss father. His English mother died in a freak accident, leaving him mostly void of memories of her. His aunt, who served as a governess, was fond of him but imposed strict rules. The protagonist grew up surrounded by affection and attention from the hotel's staff and guests. He excelled at an English day school and had limited sexual experiences before being sent to a school in Lyon. His father, a charming and worldly figure, provided him with information about sex before leaving him to tour Italy with another woman.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/Lolita/Lolita_ch2.mp3",
      },
      {
        summary:
          "A boy recalls his first love, Annabel, at the Hotel Mirana. They were infatuated but unable to be together. They secretly yearned for each other on the beach, their passion thwarted. A photo captures their last day together, just before Annabel's untimely death from typhus.",
        audio:
          "https://droplit.nyc3.digitaloceanspaces.com/Summaries/Lolita/Lolita_ch3.mp3",
      },
    ],
  },
];

function updateChapter(change) {
  currentChapterIndex += change;
  if (currentChapterIndex < 0) {
    currentBookIndex = (currentBookIndex - 1 + books.length) % books.length;
    currentChapterIndex = books[currentBookIndex].chapters.length - 1;
  } else if (currentChapterIndex >= books[currentBookIndex].chapters.length) {
    currentBookIndex = (currentBookIndex + 1) % books.length;
    currentChapterIndex = 0;
  }

  const book = books[currentBookIndex];
  const chapter = book.chapters[currentChapterIndex];
  document.querySelector(".booksample-image").src = book.cover;
  document.querySelectorAll(".summary").forEach((elem, index) => {
    if (index === currentChapterIndex) {
      elem.style.display = "";
      elem.textContent = chapter.summary;
    } else {
      elem.style.display = "none";
    }
  });

  const buttons = document.querySelectorAll(".audio-button");
  buttons.forEach((btn, index) => {
    if (index === currentChapterIndex) {
      btn.dataset.audio = chapter.audio;
      btn.dataset.summary = `summary${index + 1}`;
      btn.textContent = `Chapter ${index + 1}`;
    }
  });
}

function updateBook(change) {
  currentBookIndex = (currentBookIndex + change + books.length) % books.length;
  // Reset the chapter index to show the first chapter of the new book
  currentChapterIndex = 0;

  const book = books[currentBookIndex];
  document.querySelector(".booksample-image").src = book.cover;

  book.chapters.forEach((chapter, index) => {
    const summaryElement = document.getElementById(`summary${index + 1}`);
    summaryElement.textContent = chapter.summary;
    summaryElement.style.display = index === 0 ? "" : "none"; // Show first chapter summary, hide others

    const button = document.querySelectorAll(".audio-button")[index];
    button.dataset.audio = chapter.audio;
    button.dataset.summary = `summary${index + 1}`;
    button.textContent = `Chapter ${index + 1}`;
  });
}
