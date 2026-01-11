/**
 * Projects script for 53Studios website
 * Handles project grid and project details functionality
 */

export class Projects {
  constructor() {
    this.projectGrid = document.querySelector('.project-grid');
    this.init();
  }

  init() {
    if (this.projectGrid) {
      this.loadProjects();
    }
  }

  loadProjects() {
    // Project data would typically come from a CMS or API
    const projects = [
      {
        title: 'Modern Residential Interior',
        category: 'Residential',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        link: 'projects.html'
      },
      {
        title: 'Contemporary Office Space',
        category: 'Commercial',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
        link: 'projects.html'
      },
      {
        title: 'Luxury Hotel Lobby',
        category: 'Hospitality',
        image: 'https://images.unsplash.com/photo-1618219740975-d40978bb7378?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
        link: 'projects.html'
      }
    ];

    // Create project items
    projects.forEach(project => {
      const projectItem = document.createElement('a');
      projectItem.href = project.link;
      projectItem.className = 'project-item';
      
      projectItem.innerHTML = `
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="project-info">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${project.category}</p>
        </div>
      `;

      this.projectGrid.appendChild(projectItem);
    });
  }
} 