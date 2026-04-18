import "./tokens/neu.css";
import "./tokens/animations.css";

export { NeuProvider } from "./components/NeuProvider";
export { useNeuTheme } from "./hooks/useNeuTheme";
export { useReveal, useCountUp, useRipple } from "./hooks/useAnimation";

// Date
export { Calendar } from "./components/Calendar/Calendar";
export { DatePicker } from "./components/DatePicker/DatePicker";

// Form
export { Button } from "./components/Button/Button";
export { Input } from "./components/Input/Input";
export { Textarea } from "./components/Textarea/Textarea";
export { Switch } from "./components/Switch/Switch";
export { Checkbox } from "./components/Checkbox/Checkbox";
export { RadioGroup } from "./components/RadioGroup/RadioGroup";
export { Select } from "./components/Select/Select";
export { Slider } from "./components/Slider/Slider";
export { ToggleGroup } from "./components/ToggleGroup/ToggleGroup";
export { FileUpload } from "./components/FileUpload/FileUpload";
export type { UploadedFile } from "./components/FileUpload/FileUpload";

// Layout
export { Card } from "./components/Card/Card";
export { Divider } from "./components/Divider/Divider";

// Data table
export { DataTable } from "./components/DataTable/DataTable";

// Navigation
export { Tabs } from "./components/Tabs/Tabs";
export { Breadcrumb } from "./components/Breadcrumb/Breadcrumb";
export { Pagination } from "./components/Pagination/Pagination";

// Data display
export { Badge } from "./components/Badge/Badge";
export { Avatar } from "./components/Avatar/Avatar";
export { Progress } from "./components/Progress/Progress";
export { Skeleton } from "./components/Skeleton/Skeleton";
export { Spinner } from "./components/Spinner/Spinner";

// Command
export { Command } from "./components/Command/Command";
export type { CommandItem } from "./components/Command/Command";
export { Combobox } from "./components/Combobox/Combobox";
export type { ComboboxOption } from "./components/Combobox/Combobox";

// Overlay
export { Modal } from "./components/Modal/Modal";
export { Popover } from "./components/Popover/Popover";
export { Tooltip } from "./components/Tooltip/Tooltip";
export { DropdownMenu } from "./components/DropdownMenu/DropdownMenu";
export type { DropdownEntry, DropdownItem } from "./components/DropdownMenu/DropdownMenu";

// Feedback
export { Alert } from "./components/Alert/Alert";
export { ToastProvider, useToast } from "./components/Toast/Toast";

// Disclosure
export { Accordion } from "./components/Accordion/Accordion";

// Animation
export { Reveal } from "./components/Reveal/Reveal";

// Drawer / Sheet
export { Drawer } from "./components/Drawer/Drawer";

// Stepper
export { Stepper } from "./components/Stepper/Stepper";

// ContextMenu
export { ContextMenu } from "./components/ContextMenu/ContextMenu";

// Navbar
export { Navbar } from "./components/Navbar/Navbar";

// Sidebar
export { Sidebar } from "./components/Sidebar/Sidebar";

// BottomNav
export { BottomNav } from "./components/BottomNav/BottomNav";

// StatsCard
export { StatsCard } from "./components/StatsCard/StatsCard";

// Data visualization
export { BarChart } from "./components/BarChart/BarChart";
export type { BarChartDataItem } from "./components/BarChart/BarChart";
export { DonutChart } from "./components/DonutChart/DonutChart";
export type { DonutSegment } from "./components/DonutChart/DonutChart";

// Layout (batch 2)
export { Marquee, MarqueeItem } from "./components/Marquee/Marquee";
export { Carousel } from "./components/Carousel/Carousel";
export type { CarouselSlide } from "./components/Carousel/Carousel";

// Navigation (batch 2)
export { SpeedDial } from "./components/SpeedDial/SpeedDial";
export type { SpeedDialAction } from "./components/SpeedDial/SpeedDial";
export { MegaMenu } from "./components/MegaMenu/MegaMenu";
export type { MegaMenuItem } from "./components/MegaMenu/MegaMenu";

// Feedback (batch 2)
export { AnnouncementBar } from "./components/AnnouncementBar/AnnouncementBar";
export { CookieConsent } from "./components/CookieConsent/CookieConsent";
export type { CookieOption } from "./components/CookieConsent/CookieConsent";

// Data visualization (batch 3)
export { LineChart } from "./components/LineChart/LineChart";
export type { LineChartDataItem } from "./components/LineChart/LineChart";
export { KanbanBoard } from "./components/KanbanBoard/KanbanBoard";
export { Heatmap } from "./components/Heatmap/Heatmap";
export { TreeView } from "./components/TreeView/TreeView";
export type { TreeNode } from "./components/TreeView/TreeView";
export { ActivityFeed } from "./components/ActivityFeed/ActivityFeed";
export { ComparisonTable } from "./components/ComparisonTable/ComparisonTable";

// Feedback (batch 3)
export { LoadingOverlay } from "./components/LoadingOverlay/LoadingOverlay";
export { ConfirmDialog } from "./components/ConfirmDialog/ConfirmDialog";

// Navigation (batch 3)
export { BrowserTabs } from "./components/BrowserTabs/BrowserTabs";

// Layout (batch 3)
export { Hero } from "./components/Hero/Hero";
export { PricingCard } from "./components/PricingCard/PricingCard";

// Layout
export { Grid, Col } from "./components/Grid/Grid";

// Form (new)
export { OTPInput } from "./components/OTPInput/OTPInput";
export { Rating } from "./components/Rating/Rating";
export { TagInput } from "./components/TagInput/TagInput";
export { ColorPicker } from "./components/ColorPicker/ColorPicker";
export { SegmentedControl } from "./components/SegmentedControl/SegmentedControl";

// Overlay (new)
export { Sheet } from "./components/Sheet/Sheet";

// Navigation (new)
export { BackToTop } from "./components/BackToTop/BackToTop";

// Data Display (new)
export { Timeline } from "./components/Timeline/Timeline";
export { EmptyState } from "./components/EmptyState/EmptyState";
export { Countdown } from "./components/Countdown/Countdown";
export { ImageGallery } from "./components/ImageGallery/ImageGallery";
export type { GalleryImage } from "./components/ImageGallery/ImageGallery";
export { Chip } from "./components/Chip/Chip";
export type { TimelineItem } from "./components/Timeline/Timeline";

// Advanced / Showpiece (batch 7 new)
export { MusicPlayerCard } from "./components/MusicPlayerCard/MusicPlayerCard";
export { WeatherCard } from "./components/WeatherCard/WeatherCard";
export type { ForecastDay } from "./components/WeatherCard/WeatherCard";
export { ChatBubble } from "./components/ChatBubble/ChatBubble";
export { NotificationCenter } from "./components/NotificationCenter/NotificationCenter";
export type { NotificationItem } from "./components/NotificationCenter/NotificationCenter";
export { Onboarding } from "./components/Onboarding/Onboarding";
export type { OnboardingStep } from "./components/Onboarding/Onboarding";

// Media & Utility (batch 6 new)
export { AudioPlayer } from "./components/AudioPlayer/AudioPlayer";
export { VideoPlayer } from "./components/VideoPlayer/VideoPlayer";
export { CopyButton } from "./components/CopyButton/CopyButton";
export { Kbd } from "./components/Kbd/Kbd";
export { InfiniteScroll } from "./components/InfiniteScroll/InfiniteScroll";
export { QRCode } from "./components/QRCode/QRCode";

// Feedback (batch 5 new)
export { SnackbarProvider, useSnackbar } from "./components/Snackbar/Snackbar";
export { Banner } from "./components/Banner/Banner";
export { InlineMessage } from "./components/InlineMessage/InlineMessage";

// Navigation (batch 4 new)
export { Dock } from "./components/Dock/Dock";
export type { DockItem } from "./components/Dock/Dock";
export { Steps } from "./components/Steps/Steps";
export type { StepItem } from "./components/Steps/Steps";
export { LinkPreview } from "./components/LinkPreview/LinkPreview";
export { CommandMenu } from "./components/CommandMenu/CommandMenu";
export type { CommandMenuItem } from "./components/CommandMenu/CommandMenu";

// Layout (batch 3 new)
export { AspectRatio } from "./components/AspectRatio/AspectRatio";
export { ScrollArea } from "./components/ScrollArea/ScrollArea";
export { ResizablePanels } from "./components/ResizablePanels/ResizablePanels";
export { Masonry } from "./components/Masonry/Masonry";
export { Container } from "./components/Container/Container";

// Data Display (batch 2 new)
export { AreaChart } from "./components/AreaChart/AreaChart";
export type { AreaChartDataItem } from "./components/AreaChart/AreaChart";
export { RadarChart } from "./components/RadarChart/RadarChart";
export type { RadarChartDataItem } from "./components/RadarChart/RadarChart";
export { GaugeChart } from "./components/GaugeChart/GaugeChart";
export { Sparkline } from "./components/Sparkline/Sparkline";
export { UserCard } from "./components/UserCard/UserCard";
export { TestimonialCard } from "./components/TestimonialCard/TestimonialCard";
export { NotificationCard } from "./components/NotificationCard/NotificationCard";
export { CodeBlock } from "./components/CodeBlock/CodeBlock";

// Form (batch 1 new)
export { PasswordInput } from "./components/PasswordInput/PasswordInput";
export { NumberInput } from "./components/NumberInput/NumberInput";
export { PhoneInput } from "./components/PhoneInput/PhoneInput";
export type { CountryCode } from "./components/PhoneInput/PhoneInput";
export { PinInput } from "./components/PinInput/PinInput";
export { InputGroup } from "./components/InputGroup/InputGroup";
export { FormField } from "./components/FormField/FormField";

export { cn } from "./utils/cn";
