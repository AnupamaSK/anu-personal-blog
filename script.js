
// ----- Notes Data -----
const notes = [
    { title: "Mastering CSS Layouts", content: "I’ve been practicing Flexbox and Grid to build clean, responsive designs. Every small layout I create boosts my confidence in making beautiful websites." },
    { title: "Why I Write Notes While Learning", content: "Taking notes helps me remember concepts clearly, and when I revisit them, I understand what I learned practically during projects." },
    { title: "Git and GitHub Basics", content: "Learning to use Git has helped me track changes in my projects and back up my code safely. I use GitHub to share and maintain my projects confidently." }
];

// ----- Blogs Data -----
const blogs = [
    {
        title: "Building WebEase",
        content: "My experience building WebEase, a no-code site builder to help others create websites easily.",
        date: "July 21, 2025",
        image: "post-1.jpeg",
        likes: 0,
        comments: 0,
        shares: 0
    },
    {
        title: "How I Built My Personal Blog",
        content: "Creating my personal blog helped me learn HTML, CSS, and JavaScript practically while building something I truly own. It will showcase your growth, help you practice regularly, and start your digital presence.",
        date: "July 20, 2025",
        image: "post-2.jpg",
        likes: 0,
        comments: 0,
        shares: 0
    },
    {
        title: "Why I Love Learning Web Development",
        content: "Learning web development has given me creativity and confidence. Every project I build makes me excited about what I can create next.",
        date: "July 19, 2025",
        image: "post-3.jpg",
        likes: 0,
        comments: 0,
        shares: 0
    }
];

// =========================================
// Render Notes
// =========================================
const notesContainer = document.getElementById('notes-container');
notes.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card';
    card.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
    notesContainer.appendChild(card);
});

// =========================================
// Render Blogs with Insta-like Interaction Bar
// =========================================
const blogContainer = document.getElementById('blog-container');
blogs.forEach((blog, index) => {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
        <img src="${blog.image}" alt="${blog.title}" class="blog-image">
        <h3>${blog.title}</h3>
        <p><em>${blog.date}</em></p>
        <p>${blog.content}</p>

        <!-- Instagram-style Interaction Bar -->
        <div class="insta-bar">
            <i class="fa-regular fa-heart like-icon" id="like-${index}"></i><span id="like-count-${index}"> 0</span>
            <i class="fa-regular fa-comment comment-icon" id="comment-${index}"></i><span id="comment-count-${index}"> 0</span>
            <i class="fa-regular fa-paper-plane share-icon" id="share-${index}"></i><span id="share-count-${index}"> 0</span>
        </div>

        <!-- Hidden Comment Input -->
        <div class="comment-section" id="comment-section-${index}" style="display: none;">
            <input type="text" placeholder="Your Email" id="name-${index}" value="sheikh12@gmail.com">
            <textarea placeholder="Your Comment" id="message-${index}">Your blog is awesome!</textarea>
            <button onclick="submitComment(${index})">Post</button>
        </div>

        <div id="comments-${index}" class="comments-list"></div>
    `;
    blogContainer.appendChild(card);

    // Like Button Handler
    document.getElementById(`like-${index}`).addEventListener('click', function() {
        blogs[index].likes += 1;
        document.getElementById(`like-count-${index}`).textContent = ` ${blogs[index].likes}`;
        this.classList.add('fa-solid');
        this.classList.remove('fa-regular');
        this.style.color = 'red';
    });

    // Comment Button Handler
    document.getElementById(`comment-${index}`).addEventListener('click', function() {
        const section = document.getElementById(`comment-section-${index}`);
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
    });

    // Share Button Handler with Platform Icons
    document.getElementById(`share-${index}`).addEventListener('click', function() {
        if (this.parentElement.querySelector('.share-options')) return;

        const shareOptions = document.createElement('div');
        shareOptions.className = 'share-options';
        shareOptions.innerHTML = `
            <i class="fab fa-whatsapp whatsapp-icon" title="Share on WhatsApp" onclick="shareToPlatform(${index}, 'whatsapp')"></i>
            <i class="fab fa-facebook facebook-icon" title="Share on Facebook" onclick="shareToPlatform(${index}, 'facebook')"></i>
            <i class="fab fa-instagram instagram-icon" title="Share on Instagram" onclick="shareToPlatform(${index}, 'instagram')"></i>
        `;
        this.parentElement.appendChild(shareOptions);

        // Auto-remove after 6 seconds
        setTimeout(() => {
            shareOptions.remove();
        }, 6000);
    });
});

// =========================================
// Comment Submission Function
// =========================================
function submitComment(index) {
    const nameInput = document.getElementById(`name-${index}`);
    const messageInput = document.getElementById(`message-${index}`);
    const commentsList = document.getElementById(`comments-${index}`);

    if (nameInput.value && messageInput.value) {
        const comment = document.createElement('p');
        comment.innerHTML = `<strong>${nameInput.value}:</strong> ${messageInput.value}`;
        commentsList.appendChild(comment);

        // Increment comment count
        blogs[index].comments += 1;
        document.getElementById(`comment-count-${index}`).textContent = ` ${blogs[index].comments}`;

        // Clear fields for next comment
        nameInput.value = "";
        messageInput.value = "";
    } else {
        alert("Please enter both your email and a comment.");
    }
}

// =========================================
// Share Functionality with Platform Integration
// =========================================
function shareToPlatform(index, platform) {
    const url = encodeURIComponent(window.location.href);
    let shareUrl = "";

    if (platform === "whatsapp") {
        shareUrl = `https://wa.me/?text=${url}`;
    } else if (platform === "facebook") {
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === "instagram") {
        alert("Instagram does not support direct URL sharing. Please share manually by copying your blog link.");
        return;
    }

    blogs[index].shares += 1;
    document.getElementById(`share-count-${index}`).textContent = ` ${blogs[index].shares}`;

    window.open(shareUrl, '_blank');
}

// =========================================
// Dark Mode Toggle with Animation
// =========================================
const toggleThemeButton = document.getElementById('toggle-theme');
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleThemeButton.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    toggleThemeButton.classList.add('clicked');
    setTimeout(() => {
        toggleThemeButton.classList.remove('clicked');
    }, 400);
});

// =========================================
// Hero Image Hover to Show "Hi there" and Swap Image
// =========================================
const heroImg = document.getElementById('hero-img');
const hiPopup = document.getElementById('hi-popup');

heroImg.addEventListener('mouseenter', () => {
    hiPopup.classList.add('show');
    heroImg.src = "hi_there_image.jpg"; // hover image path
});

heroImg.addEventListener('mouseleave', () => {
    hiPopup.classList.remove('show');
    heroImg.src = "Front image.jpg"; // original image path
});
