import styles from './Button.module.scss';

function Button({ to, href, onClick, disabled, primary, black, simple, rounded, danger, s, l, className, children, ...passProps }) {
    let Component = 'button';
    let classes = `
        ${className} 
        ${styles.wrapper} 
        ${disabled ? styles.disabled : ''}
        ${primary ? styles.primary : ''}
        ${black ? styles.black : ''}
        ${simple ? styles.simple : ''}
        ${rounded ? styles.rounded : ''}
        ${danger ? styles.danger : ''}
        ${s ? styles.s : ''}
        ${l ? styles.l : ''}
    `;
    
    const props = {
        onClick,
        ...passProps,
    }
    
    if(disabled) {
        delete props.onClick;
    }

    if (to) {
        Component = 'a';
        props.to = to;
    } else if (href) {
        Component = 'a';
        props.href = href;
    }

    return ( 
        <Component className={classes} {...props}>
            <span>{children}</span>
        </Component>
     );
}

export default Button;