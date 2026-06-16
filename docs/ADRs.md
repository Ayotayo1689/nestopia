# Architecture Decision Records (ADRs)

## ADR-001: Tab-Based Navigation Over Route-Based Navigation

**Date**: 2026-06-08  
**Status**: ACCEPTED  
**Context**:
The application needed to migrate from an ecommerce route-based architecture to a tracking platform with multiple major sections (Dashboard, Assets, Locations, Map, Settings).

**Decision**:
Use tab-based navigation (bottom tabs) instead of React Router's route-based navigation.

**Rationale**:

- **Mobile-First UX**: Bottom tab navigation is the standard mobile app pattern
- **Persistent State**: Easier to maintain component state across tab switches
- **Simpler Navigation**: No URL-based state management needed for MVP
- **PWA Compatibility**: Bottom navigation works better for PWA contexts
- **Performance**: Single App component with state switching is faster than route-based

**Consequences**:

- ✅ Familiar mobile app UX pattern
- ✅ Easier to implement initially
- ⚠️ Future: URL routing may need to be added for deep linking
- ⚠️ Browser history not managed automatically

**Implementation**:

```typescript
type TabType = "dashboard" | "assets" | "locations" | "map" | "settings";
const [activeTab, setActiveTab] = useState<TabType>("dashboard");
// Render content based on activeTab
```

---

## ADR-002: Mock Data Layer for MVP

**Date**: 2026-06-08  
**Status**: ACCEPTED  
**Context**:
The MVP needed to be functional without a backend API connection.

**Decision**:
Create a comprehensive mock data layer in `src/data/mockData.ts` with realistic sample data and utility functions.

**Rationale**:

- **Independence**: Frontend can develop without backend dependency
- **Demo Ready**: Realistic data makes MVP demonstrations convincing
- **Easy Swap**: Mock data can be replaced with real API calls later
- **Type Safety**: Mock data matches TypeScript interfaces
- **Utility Functions**: Distance and ETA calculations can work with mock or real data

**Consequences**:

- ✅ Fast MVP development
- ✅ No backend dependency needed
- ✅ Deterministic testing
- ⚠️ Need to swap implementations when API is ready

**Exported Functions**:

- `mockVehicles[]` - 5 sample vehicles
- `mockLocations[]` - 5 sample locations
- `getMockDashboardMetrics()` - Real-time metrics
- `calculateDistance(lat1, lon1, lat2, lon2)` - Haversine formula
- `estimateETA(distanceKm, speedKmh)` - ETA calculation

---

## ADR-003: Centralized Type Definitions

**Date**: 2026-06-08  
**Status**: ACCEPTED  
**Context**:
Multiple pages needed consistent data models for vehicles, locations, and assets.

**Decision**:
Create single source of truth in `src/types/index.ts` with all domain models.

**Rationale**:

- **Type Safety**: Single definition prevents type mismatches
- **Maintainability**: Changes in one place propagate everywhere
- **Documentation**: Types serve as inline documentation
- **IDE Support**: IntelliSense works better with centralized types
- **Consistency**: Ensures data shape consistency across app

**Key Types**:

- `Vehicle` - Asset with tracking data
- `Location` - Geographic points with types
- `Asset` - Generic asset model
- `DashboardMetrics` - Dashboard KPIs
- `RouteInfo` - Route planning data

---

## ADR-004: Component-Scoped CSS Over Global Styles

**Date**: 2026-06-08  
**Status**: ACCEPTED  
**Context**:
Each page needed distinct styling without conflicts or global namespace pollution.

**Decision**:
Each component/page gets its own `.css` file with component-specific class naming (BEM-like convention).

**Rationale**:

- **Isolation**: Styles don't affect other components
- **Maintainability**: Easy to find and update styles
- **Scalability**: Doesn't require CSS-in-JS overhead
- **Performance**: Plain CSS is lightweight
- **Consistency**: All pages follow same pattern

**Pattern**:

```css
/* src/pages/Dashboard.css */
.dashboard-container {
  /* ... */
}
.dashboard-title {
  /* ... */
}
.metrics-grid {
  /* ... */
}
```

**Convention**:

- Use kebab-case for class names
- Prefix with component name (e.g., `.dashboard-`, `.assets-`)
- Use semantic class names (e.g., `.section-heading` not `.red-text`)

---

## ADR-005: Mobile-First Responsive Design

**Date**: 2026-06-08  
**Status**: ACCEPTED  
**Context**:
The app needed to work on mobile, tablet, and desktop devices.

**Decision**:
Use mobile-first CSS with progressive enhancement for larger screens.

**Rationale**:

- **Performance**: Mobile optimizations serve as baseline
- **Progressive Enhancement**: Desktop features build on solid mobile foundation
- **Accessibility**: Simpler mobile layouts improve accessibility
- **PWA Focus**: Mobile-first aligns with PWA priorities
- **Modern Standard**: Mobile-first is industry standard

**Breakpoints**:

- **Mobile**: 0px - 639px (default styles)
- **Tablet**: 640px - 767px (`@media (min-width: 640px)`)
- **Desktop**: 768px+ (`@media (min-width: 768px)`)

**Affected Layouts**:

- Metrics grid: 2 cols (mobile) → 3 cols (tablet) → 5 cols (desktop)
- Assets/Locations: Single column everywhere, cards stack
- Fixed navigation: Always bottom tab navigation

---

## ADR-006: Tab-Based Data Isolation

**Date**: 2026-06-08  
**Status**: ACCEPTED  
**Context**:
Pages needed to manage their own local state (search filters, forms) without global state management.

**Decision**:
Each page component manages its own state using `useState`. No Redux/Context API for MVP.

**Rationale**:

- **Simplicity**: MVP doesn't need complex state management
- **Fast Development**: useState is fastest to implement
- **No Over-Engineering**: Avoid premature optimization
- **Easy Upgrade Path**: Can migrate to Redux later if needed
- **Debugging**: Easier to trace state changes in single component

**Pattern**:

```typescript
const [searchTerm, setSearchTerm] = useState("");
const [filterStatus, setFilterStatus] = useState<string>("all");
const [formData, setFormData] = useState({
  /* ... */
});
```

**Future Upgrade Path**: Can migrate to Redux/Context API if:

- Multiple pages need shared state
- State becomes too complex
- Need time-travel debugging

---

## ADR-007: Direct Distance/ETA Calculation Over APIs

**Date**: 2026-06-08  
**Status**: ACCEPTED (MVP Only)  
**Context**:
The MVP needed to calculate distances and ETAs without external APIs.

**Decision**:
Implement Haversine formula locally and use basic speed-based ETA calculations.

**Rationale for MVP**:

- ✅ No API costs
- ✅ No external dependencies
- ✅ Instant calculations
- ✅ Offline capable (PWA)

**Future Improvements**:
When moving to production:

- 🔄 Replace with Google Maps Distance Matrix API
- 🔄 Add traffic-aware routing
- 🔄 Cache results for performance

**Functions**:

```typescript
// Haversine formula for distance
calculateDistance(lat1, lon1, lat2, lon2): number

// Basic ETA calculation
estimateETA(distanceKm, speedKmh): Date
```

**Accuracy**: Haversine is accurate within 0.5% for distances up to 1000km

---

## ADR-008: Fixed Layout Navigation vs Floating

**Date**: 2026-06-08  
**Status**: ACCEPTED  
**Context**:
Bottom navigation needed to be accessible but not interfere with content.

**Decision**:
Use fixed positioning for bottom tabs with `padding-bottom` on main content to prevent overlap.

**Rationale**:

- **Always Accessible**: Tabs always visible regardless of scroll
- **Standard Pattern**: Matches native app behavior
- **Predictable**: Users know where navigation is
- **No Overlap**: Padding prevents content overlap

**Implementation**:

```css
.app-nav {
  position: fixed;
  bottom: 0;
  height: 70px;
  z-index: 1000;
}

.app-main {
  padding-bottom: 70px;
  overflow-y: auto;
}
```

**Spacing**: 70px for nav, allowing for future expansion if needed

---

## ADR-009: Gradient Primary Color for Professional Feel

**Date**: 2026-06-08  
**Status**: ACCEPTED  
**Context**:
App needed professional branding for B2B tracking use.

**Decision**:
Use blue gradient (#1e3c72 to #523F8D) as primary color throughout.

**Rationale**:

- **Trust**: Blue conveys professionalism and trust
- **Consistency**: Same gradient everywhere for cohesive UX
- **Accessibility**: Good contrast against white backgrounds
- **B2B Appeal**: Professional blue is standard for enterprise apps
- **Modern**: Gradients feel contemporary without being trendy

**Primary Gradient**:

```css
background: linear-gradient(135deg, #1e3c72 0%, #523f8d 100%);
```

**Accent Colors**:

- **Success/In-Motion**: #22c55e (green)
- **Warning/Idle**: #f59e0b (amber)
- **Danger/Offline**: #ef4444 (red)
- **Info**: #0284c7 (cyan)

---

## ADR-010: Proprietary & Confidential Notice

**Date**: 2026-06-08  
**Status**: ACCEPTED  
**Context**:
App is proprietary and confidential per business requirements.

**Decision**:
Add "Proprietary & Confidential" notice in Settings → About section.

**Rationale**:

- **Legal Compliance**: Marks intellectual property
- **User Awareness**: Reminds users of confidentiality
- **Visible**: In Settings section users see during app use
- **Not Intrusive**: Doesn't interrupt workflow

**Implementation**:

```typescript
// In Settings page About section
<p className="copyright">
  © 2024 Asset Tracker. All rights reserved. Proprietary & Confidential.
</p>
```

---

## Future ADRs Planned

### ADR-011: Global State Management (When MVP → Production)

- Move from useState to Redux/Context API
- When multiple pages share state
- Implement time-travel debugging

### ADR-012: Backend API Integration

- Replace mock data with real APIs
- WebSocket for real-time updates
- Authentication/Authorization

### ADR-013: Google Maps Integration

- Replace map placeholder with actual Google Maps
- Markers for vehicles
- Directions API for routing

### ADR-014: Persistent Storage Strategy

- IndexedDB for offline data
- Service Worker caching
- Sync strategy when online

### ADR-015: Analytics & Monitoring

- Error tracking
- Performance monitoring
- User behavior analytics

---

**Last Updated**: 2026-06-08  
**Next Review**: When transitioning from MVP to production
