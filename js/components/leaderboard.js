// ============================================================
// HistoPath India — Leaderboard Component
// Displays player rankings, stars, badges
// ============================================================

const Leaderboard = (() => {

  function render(container) {
    container.innerHTML = '';
    const data = Storage.getLeaderboard();
    const stats = Storage.getOverallStats();

    // Stats bar
    const statsBar = document.createElement('div');
    statsBar.className = 'stats-bar glass-card glass-card--no-hover';
    statsBar.style.marginBottom = 'var(--sp-6)';
    statsBar.style.justifyContent = 'center';
    statsBar.innerHTML = `
      <div class="stat-item">
        <div class="stat-item__value text-gold">⭐ ${stats.totalStars}</div>
        <div class="stat-item__label">Total Stars</div>
      </div>
      <div class="stat-item">
        <div class="stat-item__value text-gradient">${stats.missionsCompleted}</div>
        <div class="stat-item__label">Missions Done</div>
      </div>
      <div class="stat-item">
        <div class="stat-item__value" style="color:var(--clr-accent-violet);">${stats.totalMissions}</div>
        <div class="stat-item__label">Total Missions</div>
      </div>
      <div class="stat-item">
        <div class="stat-item__value" style="color:var(--clr-accent-teal);">${Math.round((stats.missionsCompleted / stats.totalMissions) * 100)}%</div>
        <div class="stat-item__label">Progress</div>
      </div>
    `;
    container.appendChild(statsBar);

    // Progress bar
    const progWrap = document.createElement('div');
    progWrap.className = 'glass-card glass-card--no-hover';
    progWrap.style.marginBottom = 'var(--sp-6)';
    progWrap.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:var(--sp-2);font-size:var(--fs-sm);">
        <span style="color:var(--clr-text-muted)">Overall Progress</span>
        <span style="color:var(--clr-accent-teal)">${stats.missionsCompleted} / ${stats.totalMissions}</span>
      </div>
      <div class="progress-bar">
        <div class="progress-bar__fill" style="width:${(stats.missionsCompleted / stats.totalMissions) * 100}%"></div>
      </div>
    `;
    container.appendChild(progWrap);

    // Badges
    const badges = _getBadges(stats);
    if (badges.length > 0) {
      const badgeWrap = document.createElement('div');
      badgeWrap.className = 'glass-card glass-card--no-hover';
      badgeWrap.style.marginBottom = 'var(--sp-6)';
      badgeWrap.innerHTML = `<h4 style="margin-bottom:var(--sp-4);font-size:var(--fs-md);">🏅 Badges Earned</h4>`;
      const badgeList = document.createElement('div');
      badgeList.style.cssText = 'display:flex;flex-wrap:wrap;gap:var(--sp-3);';
      badges.forEach(b => {
        const badge = document.createElement('span');
        badge.className = `badge ${b.class}`;
        badge.textContent = b.label;
        badgeList.appendChild(badge);
      });
      badgeWrap.appendChild(badgeList);
      container.appendChild(badgeWrap);
    }

    // Leaderboard table
    if (data.length > 0) {
      const tableWrap = document.createElement('div');
      tableWrap.className = 'glass-card glass-card--no-hover';
      let tableHTML = `
        <h4 style="margin-bottom:var(--sp-4);font-size:var(--fs-md);">🏆 Leaderboard</h4>
        <table class="leaderboard-table">
          <thead>
            <tr><th>Rank</th><th>Player</th><th>⭐ Stars</th><th>Missions</th></tr>
          </thead>
          <tbody>
      `;

      data.forEach(p => {
        const rankIcon = p.rank === 1 ? '🥇' : p.rank === 2 ? '🥈' : p.rank === 3 ? '🥉' : p.rank;
        const highlight = p.isCurrentPlayer ? ' style="background:rgba(56,224,187,0.05);"' : '';
        const rankClass = p.rank <= 3 ? ` class="rank-${p.rank}"` : '';
        tableHTML += `<tr${rankClass}${highlight}>
          <td>${rankIcon}</td>
          <td>${p.name}${p.isCurrentPlayer ? ' (You)' : ''}</td>
          <td>${p.totalStars}</td>
          <td>${p.missionsCompleted}</td>
        </tr>`;
      });

      tableHTML += '</tbody></table>';
      tableWrap.innerHTML = tableHTML;
      container.appendChild(tableWrap);
    } else {
      const empty = document.createElement('div');
      empty.className = 'glass-card glass-card--no-hover';
      empty.style.textAlign = 'center';
      empty.innerHTML = '<p style="color:var(--clr-text-muted);">No scores yet! Complete missions to appear on the leaderboard. 🎮</p>';
      container.appendChild(empty);
    }
  }

  function _getBadges(stats) {
    const badges = [];

    if (stats.missionsCompleted >= 1) badges.push({ label: '🌟 First Mission', class: 'badge-teal' });
    if (stats.missionsCompleted >= 6) badges.push({ label: '📚 Topic Scholar', class: 'badge-violet' });
    if (stats.missionsCompleted >= 18) badges.push({ label: '🔬 Histology Hero', class: 'badge-pink' });
    if (stats.missionsCompleted >= 36) badges.push({ label: '👑 Grand Master', class: 'badge-gold' });
    if (stats.totalStars >= 10) badges.push({ label: '⭐ Star Collector', class: 'badge-gold' });
    if (stats.totalStars >= 50) badges.push({ label: '🌟 Star Hoarder', class: 'badge-gold' });
    if (stats.totalStars >= 100) badges.push({ label: '💫 Constellation', class: 'badge-gold' });

    // Check for perfect topics
    const player = Storage.getCurrentPlayer();
    if (player) {
      for (const topic of TOPICS) {
        const progress = Storage.getTopicProgress(topic.id);
        const missions = getTopicMissions(topic.id);
        const allPerfect = missions.every(m => progress[m.id]?.stars === 3);
        if (allPerfect && missions.length > 0) {
          badges.push({ label: `🏆 ${topic.title} Master`, class: 'badge-violet' });
        }
      }
    }

    return badges;
  }

  return { render };
})();
