import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

interface ChildrenProps {
  children: ReactNode;
}

interface DataProps {
  dataId: string;
  roleName?: string;
}

interface ButtonProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-pressed' | 'disabled' | 'onClick' | 'type'>,
    DataProps {
  children: ReactNode;
  label?: string;
  selected?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'icon';
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement>, DataProps {
  label: string;
  icon?: ReactNode;
  error?: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, DataProps {
  label: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, DataProps {
  label: string;
}

interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'>, ChildrenProps, DataProps {
  tone?: 'plain' | 'soft' | 'hero';
}

interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'>, ChildrenProps {
  tone?: 'teal' | 'blue' | 'amber' | 'red' | 'slate' | 'green';
}

export function AppShell({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div
      {...props}
      data-melius-ui-id="app-shell"
      data-melius-ui-role="workspace"
      className="app-shell"
    >
      {children}
    </div>
  );
}

export function PageFrame({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div {...props} data-melius-ui-id="page-frame" className="page-frame">
      {children}
    </div>
  );
}

export function Panel({ dataId, roleName, tone = 'plain', children, ...props }: PanelProps) {
  return (
    <div
      {...props}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      data-tone={tone}
      className="panel"
    >
      {children}
    </div>
  );
}

export function Button({
  dataId,
  roleName,
  children,
  onClick,
  disabled,
  selected,
  type = 'button',
  variant = 'primary',
  size = 'md',
  label,
}: ButtonProps) {
  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      data-active={selected ? 'true' : 'false'}
      aria-label={label}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className="button"
      data-variant={variant}
      data-size={size}
    >
      {children}
    </button>
  );
}

export function IconButton({
  dataId,
  roleName,
  children,
  onClick,
  disabled,
  selected,
  type = 'button',
  label,
}: ButtonProps) {
  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      data-active={selected ? 'true' : 'false'}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="icon-button"
    >
      {children}
    </button>
  );
}

export function TextField({ dataId, roleName, label, icon, error, ...props }: FieldProps) {
  return (
    <label data-melius-ui-id={dataId} data-melius-ui-role={roleName} className="field">
      <span className="field__label">{label}</span>
      <span className="field__control" data-error={error ? 'true' : 'false'}>
        {icon ? <span className="field__icon">{icon}</span> : null}
        <input {...props} aria-label={label} />
      </span>
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  );
}

export function SelectField({ dataId, roleName, label, children, ...props }: SelectProps & ChildrenProps) {
  return (
    <label data-melius-ui-id={dataId} data-melius-ui-role={roleName} className="field">
      <span className="field__label">{label}</span>
      <span className="field__control field__control--select">
        <select {...props} aria-label={label}>
          {children}
        </select>
      </span>
    </label>
  );
}

export function TextareaField({ dataId, roleName, label, ...props }: TextareaProps) {
  return (
    <label data-melius-ui-id={dataId} data-melius-ui-role={roleName} className="field">
      <span className="field__label">{label}</span>
      <span className="field__control field__control--textarea">
        <textarea {...props} aria-label={label} />
      </span>
    </label>
  );
}

export function InlineLabel({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement> & ChildrenProps) {
  return (
    <label {...props} className="inline-label">
      {children}
    </label>
  );
}

export function Badge({ tone = 'slate', children, ...props }: BadgeProps) {
  return (
    <span {...props} data-tone={tone} className="badge">
      {children}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  action,
  children,
  dataId,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  children?: ReactNode;
  dataId: string;
}) {
  return (
    <div data-melius-ui-id={dataId} data-melius-ui-role="section-header" className="section-title">
      <div>
        {eyebrow ? <p>{eyebrow}</p> : null}
        <h2>{title}</h2>
        {children ? <span>{children}</span> : null}
      </div>
      {action ? <div className="section-title__action">{action}</div> : null}
    </div>
  );
}

export function StepMarker({ step, active }: { step: number; active: boolean }) {
  return (
    <span className="step-marker" data-active={active ? 'true' : 'false'}>
      {step}
    </span>
  );
}
