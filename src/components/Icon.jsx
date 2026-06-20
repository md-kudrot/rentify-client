import React from 'react';
import * as Icons from '@gravity-ui/icons';

export default function Icon({ name, className = '', size = 18 }) {
  // Map semantic icon names to native Gravity UI icons
  const mapping = {
    menu: Icons.Bars,
    location_on: Icons.MapPin,
    apartment: Icons.House,
    payments: Icons.CircleDollar,
    search: Icons.Magnifier,
    arrow_forward: Icons.ArrowRight,
    verified_user: Icons.ShieldCheck,
    support_agent: Icons.Headphones,
    security: Icons.Shield,
    smart_toy: Icons.Cpu,
    star_filled: Icons.StarFill,
    star_outline: Icons.Star,
    public: Icons.Globe,
    mail: Icons.Envelope,
    share: Icons.ArrowUpRightFromSquare,
    ios_share: Icons.ArrowUpRightFromSquare,
    send: Icons.PaperPlane,
    explore: Icons.Compass,
    favorite: Icons.Heart,
    favorite_filled: Icons.HeartFill,
    event_available: Icons.Calendar,
    person: Icons.Person,
    verified: Icons.ShieldCheck,
    grid_view: Icons.LayoutCells,
    tune: Icons.Sliders,
    check: Icons.Check,
    expand_more: Icons.ChevronDown,
    chevron_left: Icons.ChevronLeft,
    chevron_right: Icons.ChevronRight,
    
    // Real Estate Facility & Amenities mapping to native @gravity-ui/icons
    bed: Icons.House,
    king_bed: Icons.House,
    shower: Icons.Droplet,
    bathtub: Icons.Droplet,
    aspect_ratio: Icons.VectorSquare,
    square_foot: Icons.VectorSquare,
    directions_car: Icons.Car,
    wifi: Icons.Signal,
    pool: Icons.Droplet,
    cooking: Icons.Mug,
    local_cafe: Icons.CirclePlay,
    bolt: Icons.Thunderbolt,
    shield_lock: Icons.Lock,
    
    // Dashboard new mappings
    dashboard: Icons.LayoutCells,
    real_estate_agent: Icons.House,
    analytics: Icons.ChartLine,
    settings: Icons.Gear,
    home: Icons.House,
    description: Icons.File,
    build: Icons.Wrench,
    account_balance: Icons.House,
    group: Icons.Persons,
    notifications: Icons.Bell,
    more_vert: Icons.EllipsisVertical,
    trending_up: Icons.ArrowUpRight,
    warning: Icons.TriangleExclamation,
    info: Icons.CircleInfo,
    update: Icons.ArrowRotateRight,
    receipt_long: Icons.Receipt,
    schedule: Icons.Clock,
    check_circle: Icons.CircleCheck,
  };

  const GravityIcon = mapping[name] || Icons.CircleQuestion;

  return (
    <GravityIcon
      className={className}
      width={size}
      height={size}
    />
  );
}
