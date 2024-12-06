import styles from './Button.module.scss';

function Button({
    to,
    href,
    disabled,
    primary,
    black,
    simple,
    rounded,
    danger,
    s,
    l,
    className,
    children,
    type = 'button', // Default type 'button'
    ...passProps
}) {
    let Component = 'button';
    let classes = `${className} ${styles.wrapper}`;
    
    // Dynamically add classes based on props
    if (disabled) classes += ` ${styles.disabled}`;
    if (primary) classes += ` ${styles.primary}`;
    if (black) classes += ` ${styles.black}`;
    if (simple) classes += ` ${styles.simple}`;
    if (rounded) classes += ` ${styles.rounded}`;
    if (danger) classes += ` ${styles.danger}`;
    if (s) classes += ` ${styles.s}`;
    if (l) classes += ` ${styles.l}`;

    // For anchor (a) element, we need to conditionally render to or href
    if (to) {
        Component = 'a';
        passProps.to = to;
    } else if (href) {
        Component = 'a';
        passProps.href = href;
    }

    // For button, ensure the 'type' is passed correctly
    if (Component === 'button' && !passProps.type) {
        passProps.type = type; // Default to 'button', or 'submit' if required
    }

    // Disable click handler if button is disabled
    if (disabled) {
        delete passProps.onClick;
    }

    return (
        <Component className={classes} {...passProps}>
            {children}
        </Component>
    );
}

export default Button;
