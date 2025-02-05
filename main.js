class WorldClock {
  constructor() {
    this.timeElement = document.querySelector('.time');
    this.dateElement = document.querySelector('.date');
    this.select = document.querySelector('#countrySelect');
    this.currentTimezone = 'UTC';
    
    this.init();
  }
  
  init() {
    this.select.addEventListener('change', (e) => {
      this.currentTimezone = e.target.value;
      this.updateTime();
    });
    
    // Update time every second
    setInterval(() => this.updateTime(), 1000);
  }
  
  updateTime() {
    const options = {
      timeZone: this.currentTimezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    
    const dateOptions = {
      timeZone: this.currentTimezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    try {
      const timeString = new Date().toLocaleTimeString('en-US', options);
      const dateString = new Date().toLocaleDateString('en-US', dateOptions);
      
      this.timeElement.textContent = timeString;
      this.dateElement.textContent = dateString;
    } catch (error) {
      console.error('Error updating time:', error);
      this.timeElement.textContent = '00:00:00';
      this.dateElement.textContent = 'Invalid timezone';
    }
  }
}

// Initialize the clock when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new WorldClock();
});